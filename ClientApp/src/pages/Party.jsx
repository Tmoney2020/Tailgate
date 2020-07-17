import React from 'react'
export function Party() {
  return (
    <>
      <h1>Welcome to your Party!</h1>
      <div className="pictureBox">
        <img
          src="https://www.pets4you.com/wp-content/uploads/2018/06/golden-retriever-200x200.jpg"
          alt="partyPicture"
          className="partyPicture"
        />
      </div>
      <div className="partyDetailsWhole">
        <div className="partyDetails">
          <p className="description">
            Description:Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
            voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
            magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut
            labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p className="menu">
            Menu: item 1: Beer item 2: food item 3: wine item 4: hotdogs item 5:
            Hamburgers
          </p>
        </div>
        <div className="minorDetails">
          <p>Date: 01/01/01</p>
          <p>Start Time: 3:00 PM</p>
          <p>End Time: 5:00 PM</p>
          <p>Public</p>
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
    </>
  )
}
