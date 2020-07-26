import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn, logout, getUserId } from '../auth'
import { useParams } from 'react-router'

export function Nav(props) {
  const handleLogout = () => {
    logout()

    window.location = '/Search'
  }

  const currentUserId = getUserId()

  console.log(isLoggedIn())

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
        <Link
          to={`/profile/${currentUserId}`}
          className="btn btn-primary ml-5 mb-1"
        >
          Profile
        </Link>
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
