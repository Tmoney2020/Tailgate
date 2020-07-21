import React from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn, logout } from '../auth'
export function Nav() {
  const handleLogout = () => {
    logout()

    window.location = '/Search'
  }
  return (
    <nav>
      <ul>
        <li className="navLeft">
          <Link to="/Login">
            <img
              src="https://s3.amazonaws.com/images.toolplanet.com/Large/ST-22001__1.jpg"
              alt="hitch"
            />
          </Link>
        </li>
        <li className="navLeft">
          <Link to="/Login">Home</Link>
        </li>
        <li className="navLeft ml-2">
          {isLoggedIn() || <Link to="/Profile">Create an Account</Link>}
        </li>
        <li className="navRight Search">
          <Link to="/Search">Search</Link>
        </li>
        <li className="navRight Create">
          <Link to="/Submit">Create Tailgate</Link>
        </li>
        <li className="navRight Login">
          {(isLoggedIn() && <Link onClick={handleLogout}>Logout</Link>) || (
            <Link to="/Login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
