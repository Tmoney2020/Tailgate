import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export function Party() {
  const params = useParams()
  const id = params.id

  const [party, setParty] = useState({
    name: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    menu: '',
    type: '',
    event: '',
    comments: [],
  })

  useEffect(() => {
    const fetchParty = () => {
      fetch(`api/Parties/${id}`)
        .then(response => response.json())
        .then(apiData => setParty(apiData))
    }
    fetchParty()
  }, [])

  return (
    <>
      <h1>Welcome to {party.name}</h1>
      <div className="pictureBox">
        <img
          src="https://www.pets4you.com/wp-content/uploads/2018/06/golden-retriever-200x200.jpg"
          alt="partyPicture"
          className="partyPicture"
        />
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
        <div className="mapAndAttending">
          <img
            src="https://s3.amazonaws.com/petcentral.com/wp-content/uploads/2016/09/26151523/Golden-Retriever-Dog-Breed.jpg"
            alt="map of party"
          />
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
      <section className="comments">
        <div className="commentContainer">
          <h1>Post a Comment</h1>
          <p className="text-center">Leave here comment here.</p>
          <textarea placeholder="Add Comment" />
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
    </>
  )
}
