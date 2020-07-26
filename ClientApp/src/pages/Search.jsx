import React, { useState, useEffect, useRef } from 'react'
import ReactMapGL, {
  Popup,
  Marker,
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl'
import { Link } from 'react-router-dom'
// import Directions from 'react-map-gl-directions'
import 'mapbox-gl/dist/mapbox-gl.css'
// import 'react-map-gl-directions/dist/mapbox-gl-directions.css'

export function Search() {
  const [parties, setParties] = useState([])
  const [filterText, setFilterText] = useState('')

  const [viewport, setViewport] = useState({
    width: 500,
    height: 500,
    latitude: 27.77101804911986,
    longitude: -82.66090611749074,
    zoom: 8,
  })

  const geolocateStyle = {
    float: 'left',
    padding: '10px',
  }

  const [selectedMapParty, setSelectedMapParty] = useState(null)

  // this is trying to figure out the 2nd filter, remember there on the select is extra info right now
  const [filterType, setFilterType] = useState('')

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

  const mapRef = React.useRef()

  return (
    <>
      <div className="my-3 d-flex justify-content-center">
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          onViewportChange={setViewport}
          mapStyle="mapbox://styles/tmoney2020/ckcz7wpq80b751ir0dgv561fk"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
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
                <div className="card-header">
                  <Link to={`/Parties/${selectedMapParty.id}`}>
                    {selectedMapParty.name}
                  </Link>
                </div>
                <div className="card-body">{selectedMapParty.description}</div>
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
          {/* <Directions
            mapRef={mapRef}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          /> */}
        </ReactMapGL>
      </div>
      <div className="wholeSearchContainer">
        <div className="leftSideSearch">
          <h3>Find Your Tailgate</h3>
          <div className="p-4">
            <div className="form-group">
              <label for="dateOfEvent">Date Of Event</label>
              <input type="date" name="dateOfEvent" id="dateOfEvent" />
            </div>
            <div className="form-group">
              <label for="exampleFormControlSelect1">
                Type of Sporting Event
              </label>
              <select
                className="form-control smallSearch"
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
              <label for="exampleFormControlInput1">Location</label>
              <input
                type="text"
                className="form-control smallSearch"
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
    </>
  )
}

function SinglePartyForList(props) {
  return (
    <Link
      to={`/Parties/${props.party.id}`}
      class="list-group-item list-group-item-action thumbnailParty"
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
