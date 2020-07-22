import React, { Component } from 'react'
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

export function App() {
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
          <Nav />
          <Search />
        </Route>
        <Route path="/Parties/:id">
          <Nav />
          <Party />
        </Route>
        <Route path="/Submit">
          <Nav />
          <Submit />
        </Route>
        <Route path="/Profile">
          <Nav />
          <Profile />
        </Route>
      </Switch>
    </>
  )
}
