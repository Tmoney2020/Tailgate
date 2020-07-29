import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useDropzone } from 'react-dropzone'
import { Party } from './Party'
import { authHeader } from '../auth'

export function Submit() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()

  const [newParty, setNewParty] = useState({
    name: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    menu: '',
    type: '',
    event: '',
    address: '',
  })

  const handleInputFieldsForSubmit = event => {
    const whichFieldChanged = event.target.id
    const newValue = event.target.value

    console.log(whichFieldChanged)

    setNewParty({
      ...newParty,

      [whichFieldChanged]: newValue,
    })
  }

  const handleToSubmit = event => {
    event.preventDefault()

    fetch('/api/Parties', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(newParty),
    })
      .then(response => {
        if (response.status === 401) {
          return {
            status: 401,
            errors: { login: 'Not Authorized. Please create an account. ' },
          }
        } else {
          return response.json()
        }
      })
      .then(apiData => {
        if (apiData.errors) {
          setErrorMessage(Object.values(apiData.errors).join(' '))
        } else {
          history.push('/Search')
        }
      })
  }

  const onDropFile = async acceptedFiles => {
    // Do something with the files
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)

    // Create a formData object so we can send this
    // to the API that is expecting som form data.
    const formData = new FormData()

    // Append a field that is the form upload itself
    formData.append('file', fileToUpload)

    // Use fetch to send an authorization header and
    // a body containing the form data with the file
    const response = await fetch('/api/Uploads', {
      method: 'POST',
      headers: {
        ...authHeader(),
      },
      body: formData,
    })

    // If we receive a 200 OK response, set the
    // URL of the photo in our state so that it is
    // sent along when creating the restaurant,
    // otherwise show an error
    if (response.status === 200) {
      const apiResponse = await response.json()

      const url = apiResponse.url

      setNewParty({ ...newParty, photoURL: url })
    } else {
      setErrorMessage('Unable to upload image')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  return (
    <>
      <div className="wrapper wholeProfilePage">
        <div className="card-body">
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
        <div className="card ml-2 mr-2 mb-4 bg-light">
          <div className="card-header bg-primary text-white">
            Create Your Tailgate
          </div>
          <form onSubmit={handleToSubmit}>
            <div className="submitTop">
              <div className="form-group mr-3 ml-3">
                <label for="dateOfEvent">Date of Event</label>
                <input
                  type="date"
                  name="dateOfEvent"
                  id="date"
                  value={newParty.date}
                  onChange={handleInputFieldsForSubmit}
                />
              </div>
              <div className="form-group mr-3 ml-3">
                <label for="startTime">Start Time</label>
                <input
                  type="text"
                  name="startTime"
                  id="startTime"
                  placeholder="Example: 3:00 PM"
                  value={newParty.startTime}
                  onChange={handleInputFieldsForSubmit}
                />
              </div>
              <div className="form-group mr-3 ml-3">
                <label for="endTime">End Time</label>
                <input
                  type="text"
                  name="endTime"
                  id="endTime"
                  placeholder="Example: 5:00 PM"
                  value={newParty.endTime}
                  onChange={handleInputFieldsForSubmit}
                />
              </div>
            </div>
            <div className="form-group mr-3 ml-3">
              <label for="exampleFormControlInput1">Tailgate Party Name</label>
              <input
                maxLength="20"
                type="text"
                className="form-control"
                id="name"
                placeholder="Example: Tailgate 1"
                value={newParty.name}
                onChange={handleInputFieldsForSubmit}
              />
            </div>
            <div className="form-group mr-3 ml-3">
              <label for="exampleFormControlTextarea1">Details</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={newParty.description}
                onChange={handleInputFieldsForSubmit}
              ></textarea>
            </div>
            <div className="form-group mr-3 ml-3">
              <label for="exampleFormControlTextarea1">Food & Drink</label>
              <textarea
                className="form-control"
                id="menu"
                rows="3"
                value={newParty.menu}
                onChange={handleInputFieldsForSubmit}
              ></textarea>
            </div>
            <div className="form-group mr-3 ml-3">
              <label for="exampleFormControlSelect1">
                Type of Sporting Event
              </label>
              <select
                className="form-control"
                id="type"
                value={newParty.type}
                onChange={handleInputFieldsForSubmit}
              >
                <option>Select:</option>

                <option>Golf</option>
                <option>Hockey</option>
                <option>MLB</option>
                <option>NBA</option>
                <option>NCAA Basketball</option>
                <option>NCAA Football</option>
                <option>NFL</option>
                <option>Soccer</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group mr-3 ml-3">
              <label for="exampleFormControlInput1">
                Sporting Event Description
              </label>
              <input
                type="text"
                className="form-control"
                id="event"
                placeholder="Example: Buccaneers Vs Saints"
                value={newParty.event}
                onChange={handleInputFieldsForSubmit}
              />
            </div>
            <div className="form-group mr-3 ml-3">
              <label for="exampleFormControlInput1">Location</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Example: 1600 Pennsylvania Avenue NW, Washington, DC 20500"
                value={newParty.address}
                onChange={handleInputFieldsForSubmit}
              />
            </div>
            <div className="alert alert-primary mr-3 ml-3">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive
                  ? 'Drop the files here ...'
                  : 'Drag a new picture file here to upload!'}
              </div>
            </div>
            <button class="btn btn-primary ml-3 mb-2" type="submit">
              Create Tailgate
            </button>
          </form>
        </div>
        <footer className="partyFooter">
          <div className="searchFooter">
            <p className="textFooter">Tailgate, Home of the Tailgate Party</p>
          </div>
        </footer>
      </div>
    </>
  )
}
