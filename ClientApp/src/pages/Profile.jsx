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
    username: '',
    team: '',
    profilePhotoURL: '',
  })

  const onDropFile = async acceptedFiles => {
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)

    const formData = new FormData()

    formData.append('file', fileToUpload)

    const response = await fetch('/api/Uploads', {
      method: 'POST',
      headers: {
        ...authHeader(),
      },
      body: formData,
    })

    if (response.status === 200) {
      const apiResponse = await response.json()

      const url = apiResponse.url

      setNewUser({ ...newUser, profilePhotoURL: url })
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
          history.push('/')
        }
      })
  }

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
            Create Your Account
          </div>
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={newUser.password}
                onChange={handleInputFieldsForSubmit}
              />
            </div>
            <button type="submit" className="btn btn-primary ml-5 mb-1">
              Create Account
            </button>
          </form>
        </div>
      </div>
      <footer className="partyFooter">
        <div className="searchFooter">
          <p className="textFooter">Tailgate, Home of the Tailgate Party</p>
        </div>
      </footer>
    </>
  )
}
