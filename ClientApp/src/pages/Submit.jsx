import React, { useState } from 'react'
import { useHistory } from 'react-router'

import { Party } from './Party'

export function Submit() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()

  const [newParty, setNewParty] = useState({
    name: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    menu: '',
    type: '',
    event: '',
  })

  const handleInputFieldsForSubmit = event => {
    const whichFieldChanged = event.target.id
    const newValue = event.target.value

    console.log(whichFieldChanged)

    setNewParty({
      ...newParty,

      [whichFieldChanged]: newValue,
    })
  }

  const handleToSubmit = event => {
    event.preventDefault()

    fetch('/api/Parties', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newParty),
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
    <form onSubmit={handleToSubmit}>
      <div className="submitTop">
        <div className="form-group mr-3 ml-3">
          <label for="dateOfEvent">Date Of Event</label>
          <input
            type="date"
            name="dateOfEvent"
            id="date"
            value={newParty.date}
            onChange={handleInputFieldsForSubmit}
          />
        </div>
        <div className="form-group mr-3 ml-3">
          <label for="startTime">Start time</label>
          <input
            type="text"
            name="startTime"
            id="startTime"
            placeholder="example: 3:00 PM"
            value={newParty.startTime}
            onChange={handleInputFieldsForSubmit}
          />
        </div>
        <div className="form-group mr-3 ml-3">
          <label for="endTime">End Time</label>
          <input
            type="text"
            name="endTime"
            id="endTime"
            placeholder="example: 5:00 PM"
            value={newParty.endTime}
            onChange={handleInputFieldsForSubmit}
          />
        </div>
      </div>
      <div className="form-group mr-3 ml-3">
        <label for="exampleFormControlInput1">Tailgate party name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Example: Tailgate 1"
          value={newParty.name}
          onChange={handleInputFieldsForSubmit}
        />
      </div>
      <div className="form-group mr-3 ml-3">
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={newParty.description}
          onChange={handleInputFieldsForSubmit}
        ></textarea>
      </div>
      <div className="form-group mr-3 ml-3">
        <label for="exampleFormControlTextarea1">Food/Drink Menu</label>
        <textarea
          className="form-control"
          id="menu"
          rows="3"
          value={newParty.menu}
          onChange={handleInputFieldsForSubmit}
        ></textarea>
      </div>
      <div className="form-group mr-3 ml-3">
        <label for="exampleFormControlSelect1">Type of Sporting Event</label>
        <select
          className="form-control"
          id="type"
          value={newParty.type}
          onChange={handleInputFieldsForSubmit}
        >
          <option>Select:</option>

          <option>NFL</option>
          <option>NBA</option>
          <option>NCAA Football</option>
          <option>NCAA Basketball</option>
          <option>Golf</option>
          <option>Baseball</option>
          <option>Soccer</option>
          <option>Hockey</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-group mr-3 ml-3">
        <label for="exampleFormControlInput1">Sporting Event Description</label>
        <input
          type="text"
          className="form-control"
          id="event"
          placeholder="Bucs vs Saints"
          value={newParty.event}
          onChange={handleInputFieldsForSubmit}
        />
      </div>
      <div className="form-group mr-3 ml-3">
        <label for="exampleFormControlInput1">Location</label>
        <input
          type="text"
          className="form-control"
          id="location"
          placeholder="123 Fake Street"
        />
      </div>
      <button class="btn btn-primary ml-3" type="submit">
        Submit
      </button>
    </form>
  )
}
