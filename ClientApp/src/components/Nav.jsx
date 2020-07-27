import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn, logout, getUserId } from '../auth'
import { useParams } from 'react-router'

export function Nav(props) {
  const [navbarIsOpen, setNavbarIsOpen] = useState(false)

  const handleLogout = () => {
    logout()

    window.location = '/Search'
  }

  const currentUserId = getUserId()

  console.log(isLoggedIn())

  return (
    <header className="sticky-top">
      <nav>
        <nav className="navbar navbar-dark">
          <div className="container">
            <div className="rightNav mr-auto">
              <a className="navbar-brand">🏟️ Welcome to Tailgate</a>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setNavbarIsOpen(!navbarIsOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div
              className={`collapse navbar-collapse ${
                navbarIsOpen ? 'show' : ''
              }`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <li className="navRight Search nav-link scroll-link">
                    <Link to="/Search">Search</Link>
                  </li>
                </li>
                <li className="nav-item">
                  <li className="navLeft nav-link scroll-link">
                    {(isLoggedIn() && (
                      <Link onClick={handleLogout}>Logout</Link>
                    )) || <Link to="/Login">Login</Link>}
                  </li>
                </li>
                <li className="nav-item">
                  <li className="navLeft nav-link scroll-link">
                    {isLoggedIn() && (
                      <Link to={`/profile/${currentUserId}`}>Profile</Link>
                    )}
                    {isLoggedIn() || (
                      <Link to="/Profile">Create an Account</Link>
                    )}
                  </li>
                </li>
                <li className="nav-item">
                  <li className="navRight Create nav-link scroll-link">
                    {isLoggedIn() && <Link to="/Submit">Create Tailgate</Link>}
                  </li>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </header>
  )
}
