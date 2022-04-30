import React, { useState, useEffect } from "react";
import * as friendsService from "../../services/friendsService";
import { useParams } from "react-router-dom";
import toastr from "toastr";

function FriendForm() {
  const [formData, updateFormData] = useState({
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: 1,
    primaryImageId: 1,
    url: "",
    typeId: 1,
    skills: [],
    skillsString: "",
  });

  const [friendId, updateId] = useState({ id: "" });

  const params = useParams();

  useEffect(() => {
    checkForId();
  }, []);

  const checkForId = () => {
    if (params.friendId) {
      getFriendData(params.friendId);
    }
  };

  const onFormFieldChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    updateFormData((prevState) => {
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

  const getFriendData = (id) => {
    friendsService
      .getById(id)
      .then(getFriendDataSuccess)
      .catch(getFriendDataError);
  };

  const getFriendDataSuccess = (response) => {
    const data = response.data.item;
    // console.log({ data: data });

    updateFormData((formData) => {
      let newData = { ...formData };
      let skillsString = "";
      let skillsArray = [];

      data.skills.map((obj) => {
        skillsArray.push(obj.name);
        return (skillsString += obj.name + " ");
      });

      newData = {
        title: data.title,
        bio: data.bio,
        summary: data.summary,
        headline: data.headline,
        slug: data.slug,
        statusId: 1,
        primaryImageId: data.primaryImageId,
        url: data.url,
        typeId: data.typeId,
        skills: skillsArray,
        skillsString: skillsString,
      };

      return newData;
    });

    updateId((id) => {
      let newId = { ...id };
      newId.id = data.id;
      return newId;
    });
  };
  const getFriendDataError = (response) => {
    console.warn(response);
  };

  const buttonClick = (e) => {
    e.preventDefault();
    let data = { ...formData };
    friendId.id ? updateFriend(data, friendId.id) : submitNewFriend(data);
  };

  const submitNewFriend = (data) => {
    friendsService.add(data).then(submitSuccess).catch(submitError);
  };

  const submitSuccess = (response) => {
    toastr["success"]("You have successfully added a friend", "Success");

    updateId((id) => {
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

  const updateFriend = (data, id) => {
    let updateDate = { ...formData };
    updateDate.id = id;

    friendsService
      .update(updateDate, id)
      .then(updateSuccess)
      .catch(updateError);
  };

  const updateSuccess = () => {
    toastr["success"]("You have successfully updated your friend", "Success");
  };

  const updateError = (err) => {
    var errors = err.response.data.errors;
    // console.log(err);
    errors.map((obj) => {
      return toastr["error"](`Update Friend Unsuccessful. ${obj}`, "Error", {
        timeOut: 0,
        extendedTimeOut: 0,
      });
    });
  };

  return (
    <div className="container-fluid">
      <div className="row text-center p-3 mt-3">
        <h1>{friendId.id ? "Update Friend" : "New Friend"}</h1>
      </div>
      <div className="row justify-content-center">
        <div className="card col-6 shadow-sm" style={{ borderRadius: "20px" }}>
          <div className="card-body p-4">
            <form>
              <div className="form-outline mb-4">
                <div className="row justify-content-between">
                  <div className="col-1 ms-4">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                  </div>
                  <div className="col-10 me-4">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder=""
                      className="form-control"
                      value={formData.title}
                      onChange={onFormFieldChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-outline mb-4">
                <div className="row justify-content-between">
                  <div className="col-1 ms-4">
                    <label htmlFor="bio" className="form-label">
                      Bio
                    </label>
                  </div>
                  <div className="col-10 me-4">
                    <input
                      type="text"
                      id="bio"
                      name="bio"
                      placeholder=""
                      className="form-control"
                      value={formData.bio}
                      onChange={onFormFieldChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-outline mb-4">
                <div className="row justify-content-between">
                  <div className="col-1 ms-4">
                    <label htmlFor="summary" className="form-label">
                      Summary
                    </label>
                  </div>
                  <div className="col-10 me-4">
                    <input
                      type="text"
                      id="summary"
                      name="summary"
                      placeholder=""
                      className="form-control"
                      value={formData.summary}
                      onChange={onFormFieldChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-outline mb-4">
                <div className="row justify-content-between">
                  <div className="col-1 ms-4">
                    <label htmlFor="headline" className="form-label">
                      Headline
                    </label>
                  </div>
                  <div className="col-10 me-4">
                    <input
                      type="text"
                      id="headline"
                      name="headline"
                      placeholder=""
                      className="form-control"
                      value={formData.headline}
                      onChange={onFormFieldChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-outline mb-4">
                <div className="row justify-content-between">
                  <div className="col-1 ms-4">
                    <label htmlFor="slug" className="form-label">
                      Slug
                    </label>
                  </div>
                  <div className="col-10 me-4">
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      placeholder=""
                      className="form-control"
                      value={formData.slug}
                      onChange={onFormFieldChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-outline mb-4">
                <div className="row justify-content-between">
                  <div className="col-1 ms-4">
                    <label htmlFor="skills" className="form-label">
                      Skills
                    </label>
                  </div>
                  <div className="col-10 me-4">
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      placeholder=""
                      className="form-control"
                      value={formData.skillsString}
                      onChange={onFormFieldChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-outline mb-4">
                <div className="row justify-content-between">
                  <div className="col-1 ms-4">
                    <label htmlFor="url" className="form-label">
                      Primary Image
                    </label>
                  </div>
                  <div className="col-10 me-4">
                    <input
                      type="text"
                      id="url"
                      name="url"
                      placeholder="https://"
                      className="form-control"
                      value={formData.url}
                      onChange={onFormFieldChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-1 ms-2 me-3">
                  <button
                    id="submit"
                    className="btn btn-primary purple-btn"
                    type="button"
                    onClick={buttonClick}
                  >
                    {friendId.id ? "Update" : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendForm;
