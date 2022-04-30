import React from "react";
import { Link } from "react-router-dom";

function FriendTemplate(props) {
  const friend = props.friend;
  const id = "/friends/" + friend.id;

  const localDelete = (e) => {
    e.preventDefault();
    props.onDeleteClick(friend);
  };

  const localEdit = (e) => {
    e.preventDefault();
    props.onEditClick(friend);
  };

  //   console.log("Friends Template", friend);

  return (
    <div className="col-3 d-flex align-items-stretch friend-card p-3">
      <div className="col-12 shadow" style={{ borderRadius: "20px" }}>
        <div
          className="card card-body text-center justify-content-center"
          style={{ borderRadius: "20px" }}
        >
          <div className="row p-2">
            <div className="col-12">
              <img
                src={friend.url}
                className="rounded-circle primaryImage"
                height="300px"
                width="300px"
                alt="Friend"
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-12">
              <h4 className="title">{friend.title}</h4>
            </div>
          </div>
          <div className="row h-50">
            <p
              className="summary text-truncate text-wrap"
              style={{ height: 75 }}
            >
              {friend.summary}
            </p>
          </div>
          <div className="row">
            <div className="d-grid gap-3 d-md-flex justify-content-center align-bottom">
              <button
                type="button"
                className="btn btn-danger delete-btn col-3"
                onClick={localDelete}
              >
                Delete
              </button>
              <Link
                to={id}
                type="button"
                className="btn btn-info edit-btn col-3"
                onClick={localEdit}
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(FriendTemplate);
