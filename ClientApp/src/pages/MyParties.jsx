import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUserId } from '../auth'
import ReactMapGL, {
  Popup,
  Marker,
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl'
import { SinglePartyForList } from '../App'

export function MyParties() {
  const [parties, setParties] = useState([])
  const [filterText, setFilterText] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [filterTypeOfEvent, setFilterTypeOfEvent] = useState('')
  const [filterLocation, setFilterLocation] = useState('')
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 27.341274,
    longitude: -82.528267,
    zoom: 8,
  })

  const geolocateStyle = {
    float: 'left',
    padding: '10px',
  }

  const [selectedMapParty, setSelectedMapParty] = useState(null)

  useEffect(() => {
    const url =
      filterText.length === 0 &&
      filterTypeOfEvent.length === 0 &&
      filterDate.length === 0
        ? `/api/Parties`
        : `/api/Parties?filter=${filterText}&typeFilter=${filterTypeOfEvent}&dateFilter=${filterDate}`
    fetch(url)
      .then(response => response.json())
      .then(apiData => {
        setParties(apiData)
      })
  }, [filterText, filterDate, filterTypeOfEvent])

  const mapRef = React.useRef()
  const currentUserId = getUserId()

  return (
    <>
      <div className="wrapper searchWrapper">
        <div className="searchImageContainer">
          <img
            src="https://besthqwallpapers.com/Uploads/14-1-2019/77455/thumb2-old-trafford-panorama-aerial-view-hdr-manchester-united-stadium.jpg"
            alt="tailgate"
            className="searchPicture"
          />
          <div class="centered">Your Tailgate Parties</div>
        </div>
        <div className="leftSideSearch">
          <div className="searchCriteria">
            <div className="form-group search ml-2 mr-5">
              <label className="searchFilter" for="dateOfEvent">
                Date of Event
              </label>
              <input
                className="smallSearch"
                type="date"
                name="dateOfEvent"
                id="dateOfEvent"
                value={filterDate}
                onChange={event => setFilterDate(event.target.value)}
              />
            </div>
            <div className="form-group search ml-2 mr-5">
              <label className="searchFilter" for="exampleFormControlSelect1">
                Type of Sporting Event
              </label>
              <select
                className="form-control smallSearch"
                id="exampleFormControlSelect1"
                value={filterTypeOfEvent}
                onChange={event => setFilterTypeOfEvent(event.target.value)}
              >
                <option placeholder="Select:"></option>
                <option>Golf</option>
                <option>Hockey</option>
                <option>MLB</option>
                <option>NBA</option>
                <option>NCAA Basketball</option>
                <option>NCAA Football</option>
                <option>NFL</option>
                <option>Soccer</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group search ml-2 pb-2">
              <label className="searchFilter" for="exampleFormControlInput1">
                Location
              </label>
              <input
                type="text"
                className="form-control smallSearch"
                id="location"
                placeholder="Example: 1600 Pennsylvania Avenue NW, Washington, DC 20500"
                value={filterLocation}
                onChange={event => setFilterLocation(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="wholeSearchContainer">
          <div className="d-flex justify-content-center mr-2 ml-2 mb-2">
            <ReactMapGL
              ref={mapRef}
              {...viewport}
              onViewportChange={setViewport}
              mapStyle="mapbox://styles/tmoney2020/ckcz7wpq80b751ir0dgv561fk"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              className="mapBoarder"
            >
              <GeolocateControl
                className="geo"
                style={geolocateStyle}
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
              />
              <NavigationControl
                onChangeViewport={setViewport}
                className="nav"
              />

              {selectedMapParty && (
                <Popup
                  latitude={selectedMapParty.latitude}
                  longitude={selectedMapParty.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setSelectedMapParty(null)}
                  offsetTop={-5}
                >
                  <div className="card my-3">
                    <div className="card-header">
                      <Link to={`/Parties/${selectedMapParty.id}`}>
                        {selectedMapParty.name}
                      </Link>
                    </div>
                    <div className="card-body">
                      {selectedMapParty.description}
                    </div>
                  </div>
                </Popup>
              )}

              {parties
                .filter(
                  party => party.latitude != 0.0 && party.longitude != 0.0
                )
                .map(
                  party =>
                    party.userId === currentUserId && (
                      <Marker
                        key={party.id}
                        latitude={party.latitude}
                        longitude={party.longitude}
                      >
                        <span
                          role="img"
                          aria-label="flag"
                          onClick={() => setSelectedMapParty(party)}
                        >
                          🚩
                        </span>
                      </Marker>
                    )
                )}
            </ReactMapGL>
          </div>
          <div class="list-group rightSideSearch">
            <li className="list-group-item searchBar">
              <input
                type="text"
                placeholder="Search by Tailgate Name or Event"
                className="form-control"
                value={filterText}
                onChange={event => setFilterText(event.target.value)}
              />
            </li>
            {parties.map(
              party =>
                party.userId === currentUserId && (
                  <SinglePartyForList key={party.id} party={party} />
                )
            )}
          </div>
        </div>
        <footer className="partyFooter">
          <div className="searchFooter">
            <p className="textFooter">Tailgate, Home of the Tailgate Party</p>
          </div>
        </footer>
      </div>
    </>
  )
}
