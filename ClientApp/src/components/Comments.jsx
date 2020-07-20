import React from 'react'
export function Comments() {
  return (
    <section className="comments">
      <div className="commentContainer">
        <h1>Post a Comment</h1>
        <p className="text-center">Leave here comment here.</p>
        <textarea placeholder="Add Comment" />
      </div>
      <div className="row">
        <div className="col-md-4 text-center">
          <div className="profile">
            <img
              src="https://www.vieravet.com/sites/default/files/styles/large/adaptive-image/public/golden-retriever-dog-breed-info.jpg?itok=LCRMRkum"
              className="user"
            />
            <blockquote>
              This is the best tailgate that I have ever been too. They had
              everything! Hot dogs, beer, wine, hamburgers! Amazing!
            </blockquote>
            <h3>
              username <span>"Keep on trucking"</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
