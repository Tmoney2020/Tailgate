import React, { useState, useEffect, useRef } from 'react'
import ReactMapGL, {
  Popup,
  Marker,
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl'
import { Link } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import { getUserId } from '../auth'
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

export function Search() {
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
      filterLocation.length === 0 &&
      filterDate.length === 0
        ? `/api/Parties`
        : `/api/Parties?filter=${filterText}&typeFilter=${filterTypeOfEvent}&dateFilter=${filterDate}&locationFilter=${filterLocation}`
    fetch(url)
      .then(response => response.json())
      .then(apiData => {
        setParties(apiData)
      })
  }, [filterText, filterDate, filterTypeOfEvent, filterLocation])

  const mapRef = React.useRef()
  const currentUserId = getUserId()

  console.log(filterLocation.length)

  return (
    <>
      <div className="searchImageContainer">
        <img
          src="https://besthqwallpapers.com/Uploads/14-1-2019/77455/thumb2-old-trafford-panorama-aerial-view-hdr-manchester-united-stadium.jpg"
          alt="tailgate"
          className="searchPicture"
        />
        <div class="centered">Find Your Tailgate Party</div>
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
          <div className="form-group search ml-2 pb-2">
            <label className="searchFilter" for="exampleFormControlInput1">
              Location
            </label>
            <input
              type="text"
              className="form-control smallSearch"
              id="location"
              placeholder="123 Fake Street"
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
            <Geocoder
              className="geoSearch"
              mapRef={mapRef}
              onViewportChange={setViewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            />
            <GeolocateControl
              className="geo"
              style={geolocateStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
            <NavigationControl onChangeViewport={setViewport} className="nav" />

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
                  <div className="card-header bg-info">
                    <Link
                      className="text-white"
                      to={`/Parties/${selectedMapParty.id}`}
                    >
                      {selectedMapParty.name}
                    </Link>
                  </div>
                  <div className="card-body">{selectedMapParty.address}</div>
                  <div className="card-body">
                    <span className="popOut">Times:</span>{' '}
                    {selectedMapParty.startTime}-{selectedMapParty.endTime}{' '}
                    <span className="popOut">Date:</span>{' '}
                    {selectedMapParty.date}
                  </div>
                </div>
              </Popup>
            )}

            {parties
              .filter(party => party.latitude != 0.0 && party.longitude != 0.0)
              .map(party => (
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
              ))}
          </ReactMapGL>
        </div>
        <div class="list-group rightSideSearch">
          <li className="list-group-item searchBar">
            <input
              type="text"
              placeholder="Search By Tailgate Name"
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
      <footer className="partyFooter">
        <div className="searchFooter">
          <p className="textFooter">Tailgate, Home of the Tailgate Party</p>
        </div>
      </footer>
    </>
  )
}

function SinglePartyForList(props) {
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
            src="https://thetailgatelife.com/wp-content/uploads/2019/03/Screen-Shot-2019-03-23-at-03.29.03-1042x675.png"
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
