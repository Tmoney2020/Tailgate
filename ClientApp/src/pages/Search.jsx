import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function SinglePartyForList(props) {
  return (
    <Link
      to={`/Parties/${props.party.id}`}
      class="list-group-item list-group-item-action thumbnailParty"
    >
      <div className="listPartyLeft">
        <p>{props.party.name}</p>
        <img
          src="https://vetstreet.brightspotcdn.com/dims4/default/21dc2d6/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F9f%2F9b%2F6ff000df4e4d8e8c70608cf6e0f5%2Fgolden-retriever-ap-0johoo-645.jpg"
          id="partyPhoto"
          className="pictureThumbnail"
        />
      </div>
      <div className="listPartyCenter">
        <p>{props.party.description}</p>
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

export function Search() {
  const [parties, setParties] = useState([])
  const [filterText, setFilterText] = useState('')

  // this is trying to figure out the 2nd filter, remember there on the select is extra info right now
  const [filterType, setFilterType] = useState('')

  console.log(filterType)

  useEffect(() => {
    const url =
      filterText.length === 0
        ? `/api/Parties`
        : `/api/Parties?filter=${filterText}`
    fetch(url)
      .then(response => response.json())
      .then(apiData => {
        setParties(apiData)
      })
  }, [filterText])

  return (
    <>
      <div className="wholeSearchContainer">
        <div className="leftSideSearch">
          <h3>Filter Search</h3>
          <div className="p-4">
            <div className="form-group">
              <label for="exampleFormControlSelect1">
                Type of Sporting Event
              </label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                value={filterType}
                onChange={event => setFilterType(event.target.value)}
              >
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
            <div className="form-group">
              <label for="dateOfEvent">Date Of Event</label>
              <input type="date" name="dateOfEvent" id="dateOfEvent" />
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="123 Fake Street"
              />
            </div>
            <button type="button" class="btn btn-outline-primary">
              Search
            </button>
          </div>
        </div>
        <div class="list-group rightSideSearch">
          <li className="list-group-item">
            <input
              type="text"
              placeholder="Search"
              className="form-control"
              value={filterText}
              onChange={event => setFilterText(event.target.value)}
            />
          </li>
          {parties.map(party => (
            <SinglePartyForList key={party.id} party={party} />
          ))}
        </div>
      </div>
      <div class="jumbotron mr-3 ml-3 mt-2">
        <h1 class="display-4">This is where the map is going to go</h1>
      </div>
    </>
  )
}
