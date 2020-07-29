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

  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 27.341274,
    longitude: -82.528267,
    zoom: 8,
  })

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
    <>
      <div className="wrapper wholePartyPage">
        <div className="backgroundPictureTop p-2">
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
          <h1 className="partyTitle">Welcome to {party.name}</h1>
        </div>
        <div className="partyDetailsWhole">
          <div className="minorDetails">
            <p>
              <span className="partyMinorDetails">Date:</span> {party.date}
            </p>
            <p>
              <span className="partyMinorDetails">Start Time:</span>{' '}
              {party.startTime}
            </p>
            <p>
              <span className="partyMinorDetails">End Time:</span>{' '}
              {party.endTime}
            </p>
            <p>
              <span className="partyMinorDetails">Event:</span> {party.event}
            </p>
          </div>
          <div className="partyDetails">
            <p className="partyDetailsTopLeft">Details </p>
            <p className="partyDetailsTopRight">Food & Drink </p>
          </div>
          <div className="partyDetails">
            <p className="description">{party.description}</p>
            <p className="menu">{party.menu}</p>
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
                      <div className="card-header bg-info">
                        <Link
                          className="text-white"
                          to={`/Parties/${selectedMapParty.id}`}
                        >
                          {selectedMapParty.name}
                        </Link>
                      </div>
                      <div className="card-body">
                        {selectedMapParty.address}
                      </div>
                      <div className="card-body">
                        <span className="popOut">Times:</span>{' '}
                        {selectedMapParty.startTime}-{selectedMapParty.endTime}{' '}
                        <span className="popOut">Date:</span>{' '}
                        {selectedMapParty.date}
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
              <p className="text-center">
                {party.address ? (
                  <p className="text-center addressFont">
                    <span className="popOut">Location:</span> {party.address}
                  </p>
                ) : (
                  <p className="text-center">
                    <span className="popOut">Address Unknown</span>
                  </p>
                )}
              </p>
              {currentUserId === party.userId && (
                <div className="d-flex justify-content-center mb-4">
                  <button
                    className="btn btn-danger btn-sm partyButtons"
                    onClick={handleDelete}
                  >
                    Delete Party
                  </button>
                  <Link
                    to={`/Parties/${id}/edit`}
                    className="btn btn-primary btn-sm partyButtons"
                  >
                    Edit Party
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <form onSubmit={handleNewCommentSubmit}>
          <section className="comments">
            <div className="commentContainer mt-4">
              <h1>Post a Comment</h1>
              <p className="text-center">Leave a here comment here.</p>
              <textarea
                maxLength="75"
                placeholder="Add Comment"
                id="body"
                value={newComment.body}
                onChange={handleNewCommentFieldChange}
              />
              <button className="btn btn-primary mt-2" type="submit">
                Post Comment
              </button>
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
      <footer className="partyFooter">
        <div className="footer"></div>
      </footer>
    </>
  )
}
