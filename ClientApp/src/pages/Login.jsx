import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { recordAuthentication } from '../auth'

export function Login() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()

  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  })

  const handleInputFieldsForSubmit = event => {
    const whichFieldChanged = event.target.id
    const newValue = event.target.value

    console.log(newValue)
    console.log(whichFieldChanged)

    setLoginUser({
      ...loginUser,

      [whichFieldChanged]: newValue,
    })
  }

  const handleToSubmit = event => {
    event.preventDefault()

    event.preventDefault()
    fetch('/api/Sessions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(loginUser),
    })
      .then(response => response.json())
      .then(apiResponse => {
        if (apiResponse.status === 400) {
          setErrorMessage(Object.values(apiResponse.errors).join(' '))
        } else {
          recordAuthentication(apiResponse)
          window.location = '/Search'
        }
      })
  }

  return (
    <div className="logInWrapper wrapper">
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleToSubmit}>
        <div className="Login-Container">
          <ul className="login">
            <li>
              <input
                className="loginField"
                type="text"
                placeholder="Email"
                id="email"
                value={loginUser.email}
                onChange={handleInputFieldsForSubmit}
              />
            </li>
            <li>
              <input
                className="loginField"
                type="password"
                placeholder="Password"
                id="password"
                value={loginUser.password}
                onChange={handleInputFieldsForSubmit}
              />
            </li>
            <li>
              <button className="buttonLogIn" to="/Search" type="Submit">
                Login
              </button>
            </li>
            <li>
              <Link to="/Search">
                <button className="buttonLogIn">Proceed as guest</button>
              </Link>
            </li>
          </ul>
          <ul className="loginTwo">
            <li>
              <Link to="/Profile">
                <button className="createAccount" to="#">
                  Create an account
                </button>
              </Link>
            </li>
            <li>
              <Link to="#">
                <button className="resetAccount" to="#">
                  Reset Account
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </form>
    </div>
  )
}
