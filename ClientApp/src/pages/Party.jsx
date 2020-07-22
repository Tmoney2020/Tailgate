import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { authHeader } from '../auth'
import ReactMapGL, { Popup, Marker } from 'react-map-gl'
import { Link } from 'react-router-dom'

export function Party() {
  const params = useParams()
  const id = parseInt(params.id)

  const [selectedMapParty, setSelectedMapParty] = useState(null)

  const [viewport, setViewport] = useState({
    width: 500,
    height: 500,
    latitude: 27.77101804911986,
    longitude: -82.66090611749074,
    zoom: 8,
  })

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

  return (
    <div className="wrapper wholePartyPage">
      <div className="backgroundPictureTop">
        <h1>Welcome to {party.name}</h1>
        <div className="pictureBox">
          <img
            src="https://www.pets4you.com/wp-content/uploads/2018/06/golden-retriever-200x200.jpg"
            alt="partyPicture"
            className="partyPicture"
          />
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
              onViewportChange={setViewport}
              {...viewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            >
              {selectedMapParty && (
                <Popup
                  latitude={party.latitude}
                  longitude={party.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setSelectedMapParty(null)}
                  offsetTop={-5}
                >
                  <div className="card my-3">
                    <div className="card-header">{party.address}</div>
                    <div className="card-body">
                      I want this to be directions
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
          <div className="attending">
            <p># of Attending</p>
            <div className="affirmation">
              <button className="attendingButton" to="#">
                Yes
              </button>
              <button className="attendingButton" to="#">
                No
              </button>
              <button className="attendingButton" to="#">
                Maybe
              </button>
            </div>
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
          </div>
          {party.comments.length > 0 && (
            <div className="row">
              {party.comments.map(comment => (
                <div key={comment.id} className="col-md-4 text-center">
                  <div className="profile">
                    <img
                      src="https://www.vieravet.com/sites/default/files/styles/large/adaptive-image/public/golden-retriever-dog-breed-info.jpg?itok=LCRMRkum"
                      className="user"
                    />
                    <blockquote>{comment.body}</blockquote>
                    <h3>
                      username <span>"{comment.flair}"</span>
                    </h3>
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
