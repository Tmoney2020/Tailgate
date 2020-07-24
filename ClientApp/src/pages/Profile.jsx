import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useDropzone } from 'react-dropzone'
import { authHeader } from '../auth'

export function Profile() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()

  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
  })

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

      setNewUser({ ...newUser, photoURL: url })
    } else {
      setErrorMessage('Unable to upload image')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  const handleInputFieldsForSubmit = event => {
    const whichFieldChanged = event.target.id
    const newValue = event.target.value

    console.log(whichFieldChanged)

    setNewUser({
      ...newUser,

      [whichFieldChanged]: newValue,
    })
  }

  const handleToSubmit = event => {
    event.preventDefault()

    fetch('/api/Users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(apiData => {
        console.log(apiData)
        if (apiData.status === 400) {
          const newMessage = Object.values(apiData.errors).join(' ')
          setErrorMessage(newMessage)
        } else {
          history.push('/Search')
        }
      })
  }

  return (
    <div className="card mt-3 ml-2 mr-2">
      <div className="card-header">Create an Account</div>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleToSubmit}>
        <div className="form-group ml-5 mr-5 mt-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            value={newUser.fullName}
            onChange={handleInputFieldsForSubmit}
          />
        </div>
        <div className="form-group ml-5 mr-5 mt-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={newUser.email}
            onChange={handleInputFieldsForSubmit}
          />
        </div>
        <div className="form-group ml-5 mr-5 mt-2">
          <label htmlFor="email">Username</label>
          <input
            type="username"
            className="form-control"
            id="username"
            // value={newUser.email}
            onChange={handleInputFieldsForSubmit}
          />
        </div>
        <div className="form-group ml-5 mr-5 mt-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={newUser.password}
            onChange={handleInputFieldsForSubmit}
          />
        </div>
        <div className="form-group ml-5 mr-5 mt-2">
          <label htmlFor="email">Favorite Sports Team</label>
          <input
            type="team"
            className="form-control"
            id="team"
            value={newUser.email}
            onChange={handleInputFieldsForSubmit}
          />
        </div>
        <div className="alert alert-primary mr-5 ml-5">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive
              ? 'Drop the files here ...'
              : 'Drag a new picture file here to upload!'}
          </div>
        </div>
        <button type="submit" className="btn btn-primary ml-5 mb-1">
          Submit
        </button>
      </form>
    </div>
  )
}
