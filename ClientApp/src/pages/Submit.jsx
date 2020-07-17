import React from 'react'
export function Submit() {
  return (
    <form>
      <div className="submitTop">
        <div className="form-group mr-3 ml-3">
          <label for="dateOfEvent">Date Of Event</label>
          <input type="date" name="dateOfEvent" id="dateOfEvent" />
        </div>
        <div className="form-group mr-3 ml-3">
          <label for="startTime">Start time</label>
          <input
            type="text"
            name="startTime"
            id="startTime"
            placeholder="example: 3:00 PM"
          />
        </div>
        <div className="form-group mr-3 ml-3">
          <label for="endTime">End Time</label>
          <input
            type="text"
            name="endTime"
            id="endTime"
            placeholder="example: 5:00 PM"
          />
        </div>
      </div>
      <div className="form-group mr-3 ml-3">
        <label for="exampleFormControlInput1">Tailgate party name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Example: Tailgate 1"
        />
      </div>
      <div className="form-group mr-3 ml-3">
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <div className="form-group mr-3 ml-3">
        <label for="exampleFormControlTextarea1">Food/Drink Menu</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <div className="form-group mr-3 ml-3">
        <label for="exampleFormControlSelect1">Type of Sporting Event</label>
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
      <div className="form-group mr-3 ml-3">
        <label for="exampleFormControlInput1">Sporting Event Description</label>
        <input
          type="text"
          className="form-control"
          id="location"
          placeholder="Bucs vs Saints"
        />
      </div>
      <div className="form-group mr-3 ml-3">
        <label for="exampleFormControlInput1">Location</label>
        <input
          type="text"
          className="form-control"
          id="location"
          placeholder="123 Fake Street"
        />
      </div>
      <div className="form-group mr-3 ml-3">
        <label for="exampleFormControlSelect1">Public or Private</label>
        <select className="form-control" id="exampleFormControlSelect1">
          <option>Public</option>
          <option>Private</option>
        </select>
      </div>
      <button class="btn btn-primary ml-3" type="submit">
        Submit
      </button>
    </form>
  )
}
