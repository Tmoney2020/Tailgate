import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { authHeader } from '../auth'
import { useDropzone } from 'react-dropzone'

export function EditParty() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()

  const params = useParams()
  const id = parseInt(params.id)

  const [editingParty, setEditingParty] = useState({
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

  const handleToSubmit = event => {
    event.preventDefault()

    fetch(`/api/Parties/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(editingParty),
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
          history.push(`/Parties/${id}`)
        }
      })
  }

  const handleInputFieldsForSubmit = event => {
    const whichFieldChanged = event.target.id
    const newValue = event.target.value

    setEditingParty({
      ...editingParty,

      [whichFieldChanged]: newValue,
    })
  }

  const fetchParty = () => {
    fetch(`api/Parties/${id}`)
      .then(response => response.json())
      .then(apiData => setEditingParty(apiData))
  }

  useEffect(() => {
    fetchParty()
  }, [])

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

      setEditingParty({ ...editingParty, photoURL: url })
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
        <div className="card ml-2 mr-2 bg-light">
          <div className="card-header bg-primary text-white">
            Edit Your Party
          </div>
          <form onSubmit={handleToSubmit}>
            <div className="submitTop">
              <div className="form-group mr-3 ml-3">
                <label for="dateOfEvent">Date Of Event</label>
                <input
                  type="date"
                  name="dateOfEvent"
                  id="date"
                  value={editingParty.date}
                  onChange={handleInputFieldsForSubmit}
                />
              </div>
              <div className="form-group mr-3 ml-3">
                <label for="startTime">Start time</label>
                <input
                  type="text"
                  name="startTime"
                  id="startTime"
                  placeholder="example: 3:00 PM"
                  value={editingParty.startTime}
                  onChange={handleInputFieldsForSubmit}
                />
              </div>
              <div className="form-group mr-3 ml-3">
                <label for="endTime">End Time</label>
                <input
                  type="text"
                  name="endTime"
                  id="endTime"
                  placeholder="example: 5:00 PM"
                  value={editingParty.endTime}
                  onChange={handleInputFieldsForSubmit}
                />
              </div>
            </div>
            <div className="form-group mr-3 ml-3">
              <label for="exampleFormControlInput1">Tailgate party name</label>
              <input
                maxLength="20"
                type="text"
                className="form-control"
                id="name"
                placeholder="Example: Tailgate 1"
                value={editingParty.name}
                onChange={handleInputFieldsForSubmit}
              />
            </div>
            <div className="form-group mr-3 ml-3">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={editingParty.description}
                onChange={handleInputFieldsForSubmit}
              ></textarea>
            </div>
            <div className="form-group mr-3 ml-3">
              <label for="exampleFormControlTextarea1">Food/Drink Menu</label>
              <textarea
                className="form-control"
                id="menu"
                rows="3"
                value={editingParty.menu}
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
                value={editingParty.type}
                onChange={handleInputFieldsForSubmit}
              >
                <option>Select:</option>

                <option>NFL</option>
                <option>NBA</option>
                <option>NCAA Football</option>
                <option>NCAA Basketball</option>
                <option>Golf</option>
                <option>Baseball</option>
                <option>Soccer</option>
                <option>Hockey</option>
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
                placeholder="Bucs vs Saints"
                value={editingParty.event}
                onChange={handleInputFieldsForSubmit}
              />
            </div>
            <div className="form-group mr-3 ml-3">
              <label for="exampleFormControlInput1">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="123 Fake Street"
                value={editingParty.address}
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
            <button class="btn btn-primary ml-3" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
