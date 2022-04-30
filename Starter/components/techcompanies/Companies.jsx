import React, { useState, useEffect } from "react";
import toastr from "toastr";
import * as techcompaniesServic from "../../services/techcompaniesService";

function Companies() {
  const [companyData, setCompanyData] = useState({
    newForm: {
      name: "",
      profile: "",
      summary: "",
      headline: "",
      contactInformation: "",
      slug: "",
      statusId: "Active",
      images: [{ imageTypeId: 0, imageUrl: "" }],
      urls: [],
      tags: [],
    },
    updateForm: {
      id: "",
      name: "",
      profile: "",
      summary: "",
      headline: "",
      contactInformation: "",
      slug: "",
      statusId: "Active",
      images: [{ imageTypeId: 0, imageUrl: "" }],
      urls: [],
      tags: [],
    },
    returnedData: [],
  });

  const getTechCompanies = () => {
    techcompaniesServic
      .get(0, 100)
      .then(getTechCompaniesSuccess)
      .catch(getTechCompaniesError);
  };

  const getTechCompaniesSuccess = (response) => {
    let companyArray = response.data.item.pagedItems;
    setCompanyData((prevState) => {
      const companies = { ...prevState };
      companies.returnedData = companyArray;
      return companies;
    });
  };

  const getTechCompaniesError = (response) => {
    console.log(response);
  };

  const submitButtonClicked = (e) => {
    e.preventDefault();
    const data = companyData.newForm;
    techcompaniesServic
      .add(data)
      .then(addCompanySuccess)
      .catch(addCompanyError);
  };

  const addCompanySuccess = () => {
    toastr["success"]("You have successfully added a company", "Success");
  };

  const addCompanyError = (err) => {
    let errors = err.response.data.errors;
    console.log(errors);
    errors.map((obj) => {
      return toastr["error"](`Add Job Unsuccessful. ${obj}`, "Error", {
        timeOut: 0,
        extendedTimeOut: 0,
      });
    });
  };

  const updateButtonClicked = (e) => {
    e.preventDefault();
    const data = companyData.updateForm;
    const id = companyData.updateForm.id;
    techcompaniesServic
      .update(data, id)
      .then(updateCompanySuccess)
      .catch(updateCompanyError);
  };

  const updateCompanySuccess = () => {
    toastr["success"]("You have successfully updated a company", "Success");
  };

  const updateCompanyError = (err) => {
    let errors = err.response.data.errors;
    console.log(errors);
    errors.map((obj) => {
      return toastr["error"](`Add Job Unsuccessful. ${obj}`, "Error", {
        timeOut: 0,
        extendedTimeOut: 0,
      });
    });
  };

  const onAddFormChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name.split("-");

    setCompanyData((prevState) => {
      const newFormData = {
        ...prevState,
      };
      if (name[0] === "new") {
        if (name[1] === "imageTypeId") {
          newFormData.newForm.images[0][name[1]] = parseInt(value);
        } else if (name[1] === "imageUrl") {
          newFormData.newForm.images[0][name[1]] = value;
        } else if (name[1] === "urls") {
          newFormData.newForm[name[1]] = value.split(/[, ]+/);
        } else if (name[1] === "tags") {
          newFormData.newForm[name[1]] = value.split(/[, ]+/);
        } else {
          newFormData.newForm[name[1]] = value;
        }
        return newFormData;
      } else if (name[0] === "update") {
        if (name[1] === "imageTypeId") {
          newFormData.updateForm.images[0][name[1]] = parseInt(value);
        } else if (name[1] === "imageUrl") {
          newFormData.updateForm.images[0][name[1]] = value;
        } else if (name[1] === "urls") {
          newFormData.updateForm[name[1]] = value.split(/[, ]+/);
        } else if (name[1] === "tags") {
          newFormData.updateForm[name[1]] = value.split(/[, ]+/);
        } else {
          newFormData.updateForm[name[1]] = value;
        }
        return newFormData;
      }
    });
  };

  const companyPicker = (e) => {
    let split = e.target.value.split("-");
    const companyId = split[1];
    const arr = companyData.returnedData;
    const filtered = arr.filter((obj) => {
      return obj.id === parseInt(companyId);
    });
    const company = filtered[0];

    setCompanyData((prevState) => {
      const updateForm = { ...prevState };
      updateForm.updateForm.id = companyId;
      updateForm.updateForm.name = company.name;
      updateForm.updateForm.profile = company.profile;
      updateForm.updateForm.summary = company.summary;
      updateForm.updateForm.headline = company.headline;
      updateForm.updateForm.contactInformation =
        company.contactInformation.data;
      updateForm.updateForm.slug = company.slug;
      updateForm.updateForm.images[0].imageTypeId =
        company.images[0].imageTypeId;
      updateForm.updateForm.images[0].imageUrl = company.images[0].imageUrl;
      updateForm.updateForm.urls = company.urls.map((obj) => {
        return obj.url;
      });
      updateForm.updateForm.tags = company.tags.map((obj) => {
        return obj.tagName;
      });
      return updateForm;
    });
  };

  useEffect(getTechCompanies, []);

  return (
    <div className="container-fluid">
      <div className="row text-center p-3 mt-3">
        <h1>Tech Companies</h1>
      </div>

      {
        //#region Add Form
      }

      <div className="row justify-content-evenly">
        <div className="card col-5 shadow-sm" style={{ borderRadius: "20px" }}>
          <div className="card-body p-4">
            <div className="row text-center p-2">
              <h2 className="">Add Tech Company</h2>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="new-name" className="form-label">
                  Name
                </label>
              </div>
              <div className="col-10 align-middle">
                <input
                  type="text"
                  name="new-name"
                  placeholder=""
                  className="form-control"
                  onChange={onAddFormChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="new-profile" className="form-label">
                  Profile
                </label>
              </div>
              <div className="col-10 align-middle ">
                <textarea
                  className="form-control"
                  name="new-profile"
                  rows="3"
                  onChange={onAddFormChange}
                ></textarea>
              </div>
            </div>

            <div className="row justify-content-around align-middle p-2">
              <div className="col-2">
                <label htmlFor="new-summary" className="form-label">
                  Summary
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="new-summary"
                  placeholder=""
                  className="form-control align-middle"
                  onChange={onAddFormChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="new-headline" className="form-label">
                  Headline
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="new-headline"
                  placeholder=""
                  className="form-control align-middle"
                  onChange={onAddFormChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="new-contactInformation" className="form-label">
                  Contact Information
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="new-contactInformation"
                  placeholder=""
                  className="form-control"
                  onChange={onAddFormChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="new-slug" className="form-label">
                  Slug
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="new-slug"
                  placeholder=""
                  className="form-control"
                  onChange={onAddFormChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="new-images" className="form-label">
                  Images
                </label>
              </div>
              <div className="col-10 align-middle ">
                <div className="input-group">
                  <select
                    className="form-select"
                    name="new-imageTypeId"
                    onChange={onAddFormChange}
                  >
                    <option value="3">Main</option>
                    <option value="1">SEO</option>
                    <option value="2">Cover</option>
                    <option value="4">Other</option>
                    <option value="5">Logo</option>
                  </select>
                  <input
                    type="text"
                    className="form-control col-10"
                    style={{ width: "70%" }}
                    placeholder="https://"
                    onChange={onAddFormChange}
                    name="new-imageUrl"
                  />
                </div>
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="new-urls" className="form-label">
                  URLs
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="new-urls"
                  placeholder=""
                  className="form-control"
                  onChange={onAddFormChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="new-tags" className="form-label">
                  Tags
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="new-tags"
                  placeholder=""
                  className="form-control"
                  onChange={onAddFormChange}
                />
              </div>
            </div>

            <div className="row p-2">
              <div className="col-2">
                <button
                  name="submit"
                  className="btn btn-primary purple-btn"
                  type="button"
                  onClick={submitButtonClicked}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {
          //#endregion Add Form
        }

        {
          //#region Update Form
        }

        <div className="card col-5 shadow-sm" style={{ borderRadius: "20px" }}>
          <div className="card-body p-4">
            <div className="row text-center p-2">
              <h2 className="">Update Tech Company</h2>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="update-name" className="form-label">
                  Name
                </label>
              </div>
              <div className="col-10 align-middle ">
                <select
                  className="form-select align-middle"
                  name="update-name"
                  onChange={companyPicker}
                >
                  <option defaultValue>Select</option>
                  {companyData.returnedData.map((company) => {
                    return (
                      <option
                        key={company.id}
                        value={company.name + "-" + company.id}
                      >
                        {company.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="update-profile" className="form-label">
                  Profile
                </label>
              </div>
              <div className="col-10 align-middle ">
                <textarea
                  className="form-control"
                  name="update-profile"
                  rows="3"
                  onChange={onAddFormChange}
                  value={companyData.updateForm.profile}
                ></textarea>
              </div>
            </div>

            <div className="row justify-content-around align-middle p-2">
              <div className="col-2">
                <label htmlFor="update-summary" className="form-label">
                  Summary
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="update-summary"
                  placeholder=""
                  value={companyData.updateForm.summary}
                  className="form-control align-middle"
                  onChange={onAddFormChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="update-headline" className="form-label">
                  Headline
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="update-headline"
                  placeholder=""
                  value={companyData.updateForm.headline}
                  className="form-control align-middle"
                  onChange={onAddFormChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label
                  htmlFor="update-contactInformation"
                  className="form-label"
                >
                  Contact Information
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="update-contactInformation"
                  placeholder=""
                  value={companyData.updateForm.contactInformation}
                  className="form-control"
                  onChange={onAddFormChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="update-slug" className="form-label">
                  Slug
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="update-slug"
                  placeholder=""
                  value={companyData.updateForm.slug}
                  className="form-control"
                  onChange={onAddFormChange}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="update-images" className="form-label">
                  Images
                </label>
              </div>
              <div className="col-10 align-middle ">
                <div className="input-group">
                  <select
                    className="form-select"
                    name="update-imageTypeId"
                    onChange={onAddFormChange}
                    defaultValue="3"
                  >
                    <option>Type</option>
                    <option value="1" name="SEO">
                      SEO
                    </option>
                    <option value="2" name="Cover">
                      Cover
                    </option>
                    <option value="3" name="Main">
                      Main
                    </option>
                    <option value="4" name="Other">
                      Other
                    </option>
                    <option value="5" name="Logo">
                      Logo
                    </option>
                  </select>
                  <input
                    type="text"
                    className="form-control col-10"
                    name="update-imageUrl"
                    placeholder="https://"
                    style={{ width: "70%" }}
                    onChange={onAddFormChange}
                    value={companyData.updateForm.images[0].imageUrl}
                  />
                </div>
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="update-urls" className="form-label">
                  URLs
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="update-urls"
                  placeholder=""
                  className="form-control"
                  onChange={onAddFormChange}
                  value={companyData.updateForm.urls.map((obj) => obj)}
                />
              </div>
            </div>

            <div className="row justify-content-around p-2">
              <div className="col-2">
                <label htmlFor="update-tags" className="form-label">
                  Tags
                </label>
              </div>
              <div className="col-10 align-middle ">
                <input
                  type="text"
                  name="update-tags"
                  placeholder=""
                  className="form-control"
                  onChange={onAddFormChange}
                  value={companyData.updateForm.tags.map((obj) => obj)}
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-1">
                <button
                  name="update"
                  className="btn btn-primary purple-btn"
                  type="button"
                  onClick={updateButtonClicked}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        {
          //#endregion Update Form
        }
      </div>
    </div>
  );
}

export default Companies;
