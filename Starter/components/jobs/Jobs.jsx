import React, { useState, useEffect, useCallback } from "react";
import * as jobsService from "../../services/jobsService";
import Job from "./JobsTemplate";
import { Link, useNavigate } from "react-router-dom";
import toastr from "toastr";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import debug from "sabio-debug";

function Jobs(props) {
  const [jobPageData, setJobPageData] = useState({
    jobsList: [],
    jobsMapped: [],
    pageIndex: 0,
    pageSize: 6,
    totalJobs: "",
    show: true,
    searchTerm: "",
  });

  const navigate = useNavigate();
  const _logger = debug.extend("Jobs");
  const pageChange = (page) => {
    _logger(page);
    // setIndexNumber(page - 1);
    setJobPageData((prevState) => {
      let pageChange = { ...prevState };
      pageChange.pageIndex = page - 1;
      return pageChange;
    });
  };

  useEffect(() => {
    loginCheck();
  }, [jobPageData.pageIndex]);

  const loginCheck = () => {
    if (props.user.isLoggedIn === true) {
      getJobs();
    } else {
      _logger("Not logged in");
    }
  };

  const getJobs = () => {
    jobsService
      .get(jobPageData.pageIndex, jobPageData.pageSize)
      .then(getJobsSuccess)
      .catch(getJobsError);
  };

  const getJobsSuccess = (response) => {
    _logger(response);
    let jobsArray = response.data.item.pagedItems;
    let jobsTotal = response.data.item.totalCount;

    setJobPageData((prevState) => {
      let data = { ...prevState };
      data.jobsList = jobsArray;
      data.jobsMapped = jobsArray.map(jobMapper);
      data.totalJobs = jobsTotal;
      return data;
    });
  };

  const getJobsError = (response) => {
    _logger(response);
  };

  const jobMapper = (job) => {
    return (
      <Job
        job={job}
        onDeleteClick={deleteButtonClicked}
        onEditClick={editButtonClicked}
        key={job.id}
      />
    );
  };

  const jobToggleButton = () => {
    setJobPageData((prevState) => {
      const toggle = { ...prevState };
      toggle.show = !prevState.show;
      return toggle;
    });
  };

  const editButtonClicked = useCallback((job) => {
    const id = `/jobs/${job.id}`;
    navigate(id);
  }, []);

  const deleteButtonClicked = useCallback((job) => {
    return toastr["success"](
      `Delete Job, ${job.title} ID of "${job.id}" Successful`,
      "Success"
    );
  }, []);

  const searchFieldChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setJobPageData((prevState) => {
      const jobSearch = {
        ...prevState,
      };
      jobSearch[name] = value;
      return jobSearch;
    });
  };

  const onSearchSubmt = (e) => {
    e.preventDefault();
    const search = jobPageData.searchTerm;
    if (jobPageData.searchTerm.length >= 1) {
      jobSearch(search);
      _logger(search);
    } else {
      getJobs();
      _logger("No search");
    }
  };

  const jobSearch = (search) => {
    jobsService
      .search(0, 10, search)
      .then(searchJobsSuccess)
      .catch(searchJobsError);
  };

  const searchJobsSuccess = (response) => {
    _logger(response);
    let searchResults = response.data.item.pagedItems;
    setJobPageData(() => {
      let data = { ...jobPageData };
      data.jobsList = searchResults;
      data.jobsMapped = searchResults.map(jobMapper);
      return data;
    });
  };

  const searchJobsError = (error) => {
    _logger(error);
    return toastr["error"]("Search Unsuccessful.", "Error");
  };

  return (
    <div className="container-fluid">
      <div className="col">
        <div className="row text-center mt-3">
          <h1>Jobs</h1>
        </div>
        <div className="row justify-content-between p-1">
          <div className="col-1 align-content-start">
            <Link to="/jobs/new" type="button" className="btn btn-warning">
              Add Job
            </Link>
          </div>
          <div className="col-3">
            <form className="d-flex">
              <input
                className="form-control me-2"
                name="searchTerm"
                type="search"
                placeholder="Search Jobs"
                onChange={searchFieldChange}
              />
              <button
                className="btn btn-outline-secondary"
                name="jobSearchButton"
                type="button"
                onClick={onSearchSubmt}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn btn-dark mt-1"
            onClick={jobToggleButton}
          >
            Toggle Jobs
          </button>
        </div>
        <div className="row justify-content-between">
          {jobPageData.show && jobPageData.jobsMapped}
        </div>
      </div>
      <div className="row justify-content-center text-center mt-3">
        {jobPageData.show && (
          <Pagination
            onChange={pageChange}
            defaultCurrent={jobPageData.indexNumber}
            total={jobPageData.totalJobs}
            pageSize={jobPageData.pageSize}
            locale={locale}
          />
        )}
      </div>
    </div>
  );
}

export default Jobs;
