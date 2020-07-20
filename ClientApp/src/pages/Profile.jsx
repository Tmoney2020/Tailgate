import React from 'react'
export function Profile() {
  return (
    <div className="card mt-3 ml-2 mr-2">
      <div className="card-header">Create an Account</div>
      <form>
        <div className="form-group ml-5 mr-5 mt-2">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" className="form-control" id="fullName" />
        </div>
        <div className="form-group ml-5 mr-5 mt-2">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="form-group ml-5 mr-5 mt-2">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary ml-5 mb-1">
          Submit
        </button>
      </form>
    </div>
  )
}
