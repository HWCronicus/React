import React, { useState, useEffect } from "react";
import * as jobsService from "../../services/jobsService";
import * as techcompaniesServic from "../../services/techcompaniesService";
import { useParams } from "react-router-dom";
import toastr from "toastr";

function JobsForm() {
  const [jobFormData, updateJobFormData] = useState({
    title: "",
    description: "",
    summary: "",
    pay: "",
    slug: "",
    statusId: "Active",
    techCompanyId: "",
    skills: [],
    skillsString: "",
  });

  const [techCompanies, setTechCompanies] = useState([{ id: "", name: "" }]);

  const [jobId, setJobId] = useState({ id: "" });

  const params = useParams();

  useEffect(() => {
    getTechCompanies();
    checkForId();
  }, []);

  const getTechCompanies = () => {
    techcompaniesServic.get(0, 100).then(getTechCompaniesSuccess).catch();
  };

  const getTechCompaniesSuccess = (response) => {
    let companyArray = response.data.item.pagedItems;
    setTechCompanies(() => {
      let companies = { ...techCompanies };
      let compArray = [];
      companyArray.map((company) => {
        let data = { id: company.id, name: company.name };
        return compArray.push(data);
      });
      companies = compArray;

      return companies;
    });
  };

  const checkForId = () => {
    if (params.jobId) {
      getJobData(params.jobId);
    }
  };

  const onFormFieldChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    updateJobFormData((prevState) => {
      const newFormData = {
        ...prevState,
      };

      newFormData[name] = value;

      if (name === "skills") {
        newFormData.skillsString = value;
        newFormData[name] = value.split(/[, ]+/);
      }

      return newFormData;
    });
  };

  const getJobData = (id) => {
    jobsService.getById(id).then(getJobDataSuccess).catch(getJobDataError);
  };

  const getJobDataSuccess = (response) => {
    const data = response.data.item;
    console.log(response.data.item);

    updateJobFormData((prevState) => {
      let newData = { ...prevState };
      let string = "";
      let skillsArray = [];

      data.skills.map((obj) => {
        skillsArray.push(obj.name);
        return (string += obj.name + " ");
      });

      newData.title = data.title;
      newData.description = data.description;
      newData.summary = data.summary;
      newData.pay = data.pay;
      newData.slug = data.slug;
      newData.statusId = "Active";
      newData.techCompanyId = data.techCompany.id;
      newData.skills = skillsArray;
      newData.skillsString = string;

      return newData;
    });

    setJobId((id) => {
      let newId = { ...id };
      newId.id = data.id;
      return newId;
    });
  };

  const getJobDataError = (response) => {
    console.warn(response);
  };

  const buttonClick = (e) => {
    e.preventDefault();
    let data = { ...jobFormData };
    let id = { ...jobId };
    if (jobId.id) {
      updateJob(data, id.id);
    } else {
      submitNewJob(data);
    }
  };

  const submitNewJob = (data) => {
    jobsService.add(data).then(submitSuccess).catch(submitError);
  };

  const submitSuccess = (response) => {
    toastr["success"]("You have successfully added a friend", "Success");

    setJobId((id) => {
      let newId = { ...id };
      newId.id = response.data.item;
      return newId;
    });
  };

  const submitError = (err) => {
    const errors = err.response.data.errors;
    // console.log(err);
    errors.map((obj) => {
      return toastr["error"](`Add Friend Unsuccessful. ${obj}`, "Error", {
        timeOut: 0,
        extendedTimeOut: 0,
      });
    });
  };

  const updateJob = (data, id) => {
    jobsService.update(data, id).then(updateSuccess).catch(updateError);
  };

  const updateSuccess = () => {
    toastr["success"]("You have successfully updated your friend", "Success");
  };

  const updateError = (err) => {
    var errors = err.response.data.errors;
    console.log(err);
    console.log(errors);

    errors.map((obj) => {
      return toastr["error"](`Add Job Unsuccessful. ${obj}`, "Error", {
        timeOut: 0,
        extendedTimeOut: 0,
      });
    });
  };

  return (
    <div className="container-fluid">
      <div className="row text-center p-3 mt-3">
        <h1>{jobId.id ? "Update Job Posting" : "New Job Posting"}</h1>
      </div>
      <div className="row justify-content-center">
        <div className="card col-6 shadow-sm" style={{ borderRadius: "20px" }}>
          <div className="card-body p-4">
            <div className="row justify-content-around p-2">
              <div className="col-1">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
              </div>
              <div className="col-10 align-middle">
                <input
                  type="text"
                  name="title"
                  value={jobFormData.title}
                  className="form-control"
                  onChange={onFormFieldChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-1">
                <label htmlFor="company" className="form-label">
                  Tech Company
                </label>
              </div>
              <div className="col-10 align-middle ">
                <select
                  className="form-select align-middle"
                  name="techCompanyId"
                  onChange={onFormFieldChange}
                  value={jobFormData.techCompanyId}
                >
                  {techCompanies.map((company) => {
                    return (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="row justify-content-around align-middle p-2">
              <div className="col-1">
                <label htmlFor="description" className="form-label">
                  Job Description
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="description"
                  value={jobFormData.description}
                  className="form-control align-middle"
                  onChange={onFormFieldChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-1">
                <label htmlFor="summary" className="form-label">
                  Job Summary
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="summary"
                  value={jobFormData.summary}
                  className="form-control align-middle"
                  onChange={onFormFieldChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-1">
                <label htmlFor="pay" className="form-label">
                  Pay
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="pay"
                  value={jobFormData.pay}
                  className="form-control"
                  onChange={onFormFieldChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-1">
                <label htmlFor="skills" className="form-label">
                  Skills
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="skills"
                  value={jobFormData.skillsString}
                  className="form-control"
                  onChange={onFormFieldChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-1">
                <label htmlFor="slug" className="form-label">
                  Slug
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="slug"
                  value={jobFormData.slug}
                  className="form-control"
                  onChange={onFormFieldChange}
                />
              </div>
            </div>
            <div className="row p-2">
              <div className="col-1">
                <button
                  name="submit"
                  className="btn btn-primary purple-btn"
                  type="button"
                  onClick={buttonClick}
                >
                  {jobId.id ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobsForm;
