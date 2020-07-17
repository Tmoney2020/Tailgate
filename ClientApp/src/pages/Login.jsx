import React from 'react'
import { Link } from 'react-router-dom'

export function Login() {
  return (
    <div className="logInWrapper wrapper">
      <form>
        <div className="Login-Container">
          <ul className="login">
            <li>
              <input
                className="loginField"
                type="text"
                placeholder="Username"
              />
            </li>
            <li>
              <input
                className="loginField"
                type="text"
                placeholder="Password"
              />
            </li>
            <li>
              <Link to="/Search">
                <button className="buttonLogIn" to="/Search">
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link to="/Search">
                <button className="buttonLogIn">Proceed as guest</button>
              </Link>
            </li>
          </ul>
          <ul className="loginTwo">
            <li>
              <Link to="#">
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
