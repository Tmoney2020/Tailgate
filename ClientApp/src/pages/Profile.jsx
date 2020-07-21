import React, { useState } from 'react'
import { useHistory } from 'react-router'

export function Profile() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()

  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
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
          Submit
        </button>
      </form>
    </div>
  )
}
