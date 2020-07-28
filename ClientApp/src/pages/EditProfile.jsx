import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { useDropzone } from 'react-dropzone'
import { authHeader } from '../auth'

export function EditingProfile() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()

  const params = useParams()
  const id = parseInt(params.id)

  const [editingUser, setEditingUser] = useState({
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

      setEditingUser({ ...editingUser, profilePhotoURL: url })
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

    setEditingUser({
      ...editingUser,

      [whichFieldChanged]: newValue,
    })
  }

  const handleToSubmit = event => {
    event.preventDefault()

    fetch(`/api/Users/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(editingUser),
    })
      .then(response => response.json())
      .then(apiData => {
        console.log(apiData)
        if (apiData.status === 400) {
          const newMessage = Object.values(apiData.title).join(' ')
          setErrorMessage(newMessage)
        } else {
          history.push('/')
        }
      })
  }

  const fetchUser = () => {
    fetch(`api/Users/${id}`)
      .then(response => response.json())
      .then(apiData => setEditingUser(apiData))
  }

  useEffect(() => {
    fetchUser()
  }, [])

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
            Edit Your Profile
          </div>
          <form onSubmit={handleToSubmit}>
            <div className="form-group ml-5 mr-5 mt-2">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                value={editingUser.fullName}
                onChange={handleInputFieldsForSubmit}
              />
            </div>
            <div className="form-group ml-5 mr-5 mt-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={editingUser.email}
                onChange={handleInputFieldsForSubmit}
              />
            </div>
            <div className="form-group ml-5 mr-5 mt-2">
              <label htmlFor="email">Username</label>
              <input
                type="username"
                className="form-control"
                id="username"
                value={editingUser.username}
                onChange={handleInputFieldsForSubmit}
              />
            </div>
            <div className="form-group ml-5 mr-5 mt-2">
              <label htmlFor="password">Password</label>
              <input
                placeholder="Must Re-enter Password"
                type="password"
                className="form-control"
                id="password"
                value={editingUser.password}
                onChange={handleInputFieldsForSubmit}
              />
            </div>
            <div className="form-group ml-5 mr-5 mt-2">
              <label htmlFor="email">Favorite Sports Team</label>
              <input
                type="team"
                className="form-control"
                id="team"
                value={editingUser.team}
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
      </div>
      <footer className="partyFooter">
        <div className="searchFooter">
          <p className="textFooter">Tailgate, Home of the Tailgate Party</p>
        </div>
      </footer>
    </>
  )
}
