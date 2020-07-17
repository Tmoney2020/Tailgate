import React from 'react'
import { Link } from 'react-router-dom'

export function Search() {
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
              <select className="form-control" id="exampleFormControlSelect1">
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
            <input type="text" placeholder="Search" className="form-control" />
          </li>
          <Link
            to="/Party/:id"
            class="list-group-item list-group-item-action active thumbnailParty"
          >
            <div className="listPartyLeft">
              <p>Tailgate Party 1</p>
              <img
                src="https://vetstreet.brightspotcdn.com/dims4/default/21dc2d6/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F9f%2F9b%2F6ff000df4e4d8e8c70608cf6e0f5%2Fgolden-retriever-ap-0johoo-645.jpg"
                id="partyPhoto"
                className="pictureThumbnail"
              />
            </div>
            <div className="listPartyCenter">
              <p>
                Descrition, writing something here in a paragraph. I think that
                tucker is the best dog in the whole world.
              </p>
            </div>
            <div className="listPartyRight">
              <p>NFL</p>
              <p>04/09/2020</p>
              <p>1:00 PM - 5:00 PM</p>
            </div>
          </Link>
          <Link
            to="/Party/:id"
            class="list-group-item list-group-item-action thumbnailParty"
          >
            <div className="listPartyLeft">
              <p>Tailgate Party 2</p>
              <img
                src="https://vetstreet.brightspotcdn.com/dims4/default/21dc2d6/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F9f%2F9b%2F6ff000df4e4d8e8c70608cf6e0f5%2Fgolden-retriever-ap-0johoo-645.jpg"
                id="partyPhoto"
                className="pictureThumbnail"
              />
            </div>
            <div className="listPartyCenter">
              <p>
                Golden reteriver are the best dog on the planet. They are the
                sweetest and the most fun to play with. what is going on with
                the centering of the test?
              </p>
            </div>
            <div className="listPartyRight">
              <p>NFL</p>
              <p>08/25/2020</p>
              <p>12:00 PM - 7:00 PM</p>
            </div>
          </Link>
        </div>
      </div>
      <div class="jumbotron mr-3 ml-3 mt-2">
        <h1 class="display-4">This is where the map is going to go</h1>
      </div>
    </>
  )
}
