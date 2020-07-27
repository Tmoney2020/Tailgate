import React, { Component, useState } from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'

import './custom.scss'
import { Nav } from './components/Nav'
import { Login } from './pages/Login'
import { Submit } from './pages/Submit'
import { Search } from './pages/Search'
import { Party } from './pages/Party'
import { Comments } from './components/Comments'
import { Profile } from './pages/Profile'
import { EditParty } from './pages/editParty'
import { EditingProfile } from './pages/EditProfile'
import { MyParties } from './pages/MyParties'

export function SinglePartyForList(props) {
  return (
    <Link
      to={`/Parties/${props.party.id}`}
      className="list-group-item list-group-item-action thumbnailParty mb-2 mr-2"
    >
      <div className="listPartyLeft">
        <p>{props.party.name}</p>
        {props.party.photoURL ? (
          <img
            alt="partyPhoto"
            className="pictureThumbnail"
            src={props.party.photoURL}
          />
        ) : (
          <img
            src="https://www.pets4you.com/wp-content/uploads/2018/06/golden-retriever-200x200.jpg"
            alt="partyPhoto"
            className="pictureThumbnail"
          />
        )}
      </div>
      <div className="listPartyCenter">
        <p className="textCenter">{props.party.description}</p>
      </div>
      <div className="listPartyRight">
        <p>{props.party.type}</p>
        <p>{props.party.date}</p>
        <p>
          {props.party.startTime}-{props.party.endTime}
        </p>
      </div>
    </Link>
  )
}

export function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    fullName: '',
    email: '',
    password: '',
    username: '',
    team: '',
    profilePhotoURL: '',
  })

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/Login">
          <Login />
        </Route>
        <Route path="/Search">
          <Nav loggedInUser={loggedInUser} />
          <Search />
        </Route>
        <Route exact path="/Parties/:id">
          <Nav />
          <Party
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />
        </Route>
        <Route path="/Parties/:id/edit">
          <Nav />
          <EditParty />
        </Route>
        <Route path="/Submit">
          <Nav />
          <Submit />
        </Route>
        <Route exact path="/Profile/:id">
          <Nav />
          <EditingProfile />
        </Route>
        <Route exact path="/MyParties">
          <Nav />
          <MyParties />
        </Route>
        <Route path="/Profile">
          <Nav />
          <Profile />
        </Route>
      </Switch>
    </>
  )
}
