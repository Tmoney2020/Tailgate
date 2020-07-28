import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import { authHeader, getUserId } from '../auth'
import ReactMapGL, {
  Popup,
  Marker,
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl'
import { Link } from 'react-router-dom'
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'mapbox-gl/dist/mapbox-gl.css'

export function Party() {
  const params = useParams()
  const id = parseInt(params.id)
  const history = useHistory()

  const [selectedMapParty, setSelectedMapParty] = useState(null)

  const currentUserId = getUserId()
  const mapRef = React.useRef()

  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 27.77101804911986,
    longitude: -82.66090611749074,
    zoom: 8,
  })

  const geolocateStyle = {
    float: 'left',
    padding: '10px',
  }

  const [newComment, setNewComment] = useState({
    body: '',
    flair: '',
    partyId: id,
  })

  const [party, setParty] = useState({
    name: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    menu: '',
    type: '',
    event: '',
    longitude: 0,
    latitude: 0,
    address: '',
    photoUrl: '',
    comments: [],
  })

  const fetchParty = () => {
    fetch(`api/Parties/${id}`)
      .then(response => response.json())
      .then(apiData => setParty(apiData))
  }

  useEffect(() => {
    fetchParty()
  }, [])

  const handleNewCommentFieldChange = event => {
    const whichFieldChanged = event.target.id
    const value = event.target.value

    setNewComment({ ...newComment, [whichFieldChanged]: value })
  }

  const handleNewCommentSubmit = event => {
    event.preventDefault()

    fetch(`api/Comments`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(newComment),
    })
      .then(response => response.json)
      .then(apiResponse => {
        fetchParty()
        setNewComment({ ...newComment, body: '', flair: '' })
      })
  }

  const handleDelete = event => {
    event.preventDefault()
    fetch(`api/Parties/${id}`, {
      method: 'DELETE',
      headers: { ...authHeader() },
    }).then(response => {
      if (response.status === 204) {
        history.push('/Search')
      }
    })
  }

  return (
    <div className="wrapper wholePartyPage">
      <div className="backgroundPictureTop">
        <h1>Welcome to {party.name}</h1>
        <div className="pictureBox">
          {party.photoURL ? (
            <img
              alt="partyPicture"
              className="partyPicture"
              src={party.photoURL}
            />
          ) : (
            <img
              src="https://thetailgatelife.com/wp-content/uploads/2019/03/Screen-Shot-2019-03-23-at-03.29.03-1042x675.png"
              alt="partyPicture"
              className="partyPicture"
            />
          )}
        </div>
      </div>
      <div className="partyDetailsWhole">
        <div className="partyDetails">
          <p className="description">Description: {party.description}</p>
          <p className="menu">Menu: {party.menu}</p>
        </div>
        <div className="minorDetails">
          <p>Date: {party.date}</p>
          <p>Start Time: {party.startTime}</p>
          <p>End Time: {party.endTime}</p>
        </div>
        <div className="map d-flex-column justify-content-center">
          <div className="mapAndAttending ">
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

              <Marker latitude={party.latitude} longitude={party.longitude}>
                <span
                  role="img"
                  aria-label="flag"
                  onClick={() => setSelectedMapParty(party)}
                >
                  🚩
                </span>
              </Marker>
            </ReactMapGL>
          </div>
        </div>
      </div>
      <form onSubmit={handleNewCommentSubmit}>
        <section className="comments">
          <div className="commentContainer">
            <h1>Post a Comment</h1>
            <p className="text-center">Leave here comment here.</p>
            <textarea
              placeholder="Add Comment"
              id="body"
              value={newComment.body}
              onChange={handleNewCommentFieldChange}
            />
            <button className="btn btn-primary mt-2" type="submit">
              Submit
            </button>
            {currentUserId === party.userId && (
              <>
                <button className="btn btn-danger mt-2" onClick={handleDelete}>
                  Delete Party
                </button>
                <Link
                  to={`/Parties/${id}/edit`}
                  className="btn btn-primary btn-sm mt-1"
                >
                  Edit Party
                </Link>
              </>
            )}
          </div>
          {party.comments.length > 0 && (
            <div className="row">
              {party.comments.map(comment => (
                <div key={comment.id} className="col-md-4 text-center">
                  <div className="profile">
                    {comment.user.profilePhotoURL ? (
                      <img
                        alt="user"
                        className="user"
                        src={comment.user.profilePhotoURL}
                      />
                    ) : (
                      <img
                        src="https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg"
                        alt="user"
                        className="user"
                      />
                    )}
                    <blockquote>{comment.body}</blockquote>
                    <h3>{comment.user.username}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </form>
    </div>
  )
}
