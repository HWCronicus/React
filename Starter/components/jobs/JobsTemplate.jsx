import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

function JobsTemplate(props) {
  const job = props.job;
  const id = `/jobs/${job.id}`;
  const modalButton = `#modal${job.id}`;
  const modal = `modal${job.id}`;

  const localDelete = (e) => {
    e.preventDefault();
    props.onDeleteClick(job);
  };

  const localEdit = (e) => {
    e.preventDefault();
    props.onEditClick(job);
  };

  return (
    <div className="col-4  job-card p-3">
      <div className="col-12 shadow" style={{ borderRadius: "20px" }}>
        <div
          className="card card-body text-center justify-content-center"
          style={{ borderRadius: "20px" }}
        >
          <div className="row p-2">
            <div className="col-12">
              <img
                src={job.techCompany.images[0].imageUrl}
                className="rounded-circle"
                id="modal-image"
                height="300px"
                width="300px"
                alt=""
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-12">
              <h4 className="pay">{job.pay}</h4>
            </div>
          </div>
          <div className="row">
            <p className="title">{job.title}</p>
          </div>
          <div className="row">
            <div className="d-grid gap-3 d-md-flex justify-content-center align-bottom">
              <button
                type="button"
                onClick={localDelete}
                className="btn btn-danger delete-btn col-2"
              >
                Delete
              </button>
              <Link
                to={id}
                onClick={localEdit}
                type="button"
                className="btn btn-info edit-btn col-2"
              >
                Edit
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="justify-content-center align-bottom mt-2">
              <button
                type="button"
                className="btn btn-light view-btn col-3"
                data-bs-toggle="modal"
                data-bs-target={modalButton}
              >
                View More
              </button>
            </div>
          </div>
          <div className="description d-none"></div>
          <div className="summary d-none"></div>
          <div className="techCompanyName d-none"></div>
          <div className="skills d-none"></div>
        </div>
      </div>

      <div className="modal fade" id={modal} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center justify-content-center p-3">
            <div className="row p-2">
              <div className="col-12">
                <img
                  src={job.techCompany.images[0].imageUrl}
                  id="rounded-circle modal-image"
                  height="300px"
                  width="300px"
                  alt=""
                />
              </div>
            </div>
            <div className="row p-1">
              <div className="col-12">
                <h4 id="modal-title">{job.title}</h4>
              </div>
            </div>
            <div className="row">
              <h6 id="modal-pay">{job.pay}</h6>
            </div>
            <div className="row">
              <p id="modal-company">{job.techCompany.name}</p>
            </div>
            <div className="row">
              <h6>Job Description</h6>
              <p>{job.description}</p>
            </div>
            <div className="row">
              <h6>Required Skills</h6>
              <p id="modal-skills">
                {job.skills.map((obj) => {
                  let skills = "";
                  skills += obj.name + " ";
                  return skills;
                })}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

JobsTemplate.propTypes = {
  job: propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    summary: propTypes.string.isRequired,
    pay: propTypes.string.isRequired,
    entityTypeId: propTypes.number,
    slug: propTypes.string.isRequired,
    statusId: propTypes.string,
    skills: propTypes.array.isRequired,
    techCompany: propTypes.object.isRequired,
    dateCreated: propTypes.string,
    dateModified: propTypes.string,
  }),
  onDeleteClick: propTypes.func.isRequired,
  onEditClick: propTypes.func.isRequired,
};

export default React.memo(JobsTemplate);
