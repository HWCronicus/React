import React, { useState } from "react";
import * as entitiesService from "./entitiesService";
import toastr from "toastr";

function CodeChallenge() {
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    description: "",
    cost: 0,
  });

  const onFormFieldChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormData((prevState) => {
      const newFormData = {
        ...prevState,
      };
      newFormData[name] = value;
      return newFormData;
    });
  };

  const submitButtonClick = (e) => {
    e.preventDefault();
    console.log(formData);
    submitNewProduct(formData);
  };

  const submitNewProduct = (data) => {
    entitiesService.post(data).then(submitSuccess).catch(submitError);
  };

  const submitSuccess = (response) => {
    console.log(response);
    toastr["success"](
      `You have successfully added a product with an ID of: ${response.data.item}`,
      "Success"
    );
  };

  const submitError = () => {
    toastr["error"]("Add Product Unsuccessful.", "Error");
  };
  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="card col-6">
          <div className="card-body">
            <form>
              <div className="form-outline p-2">
                <div className="row justify-content-between">
                  <div className="col-2">
                    <label htmlFor="title" className="form-label">
                      Name
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={onFormFieldChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-outline p-2">
                <div className="row justify-content-between">
                  <div className="col-2">
                    <label htmlFor="bio" className="form-label">
                      Manufacturer
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="text"
                      name="manufacturer"
                      className="form-control"
                      value={formData.manufacturer}
                      onChange={onFormFieldChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-outline p-2">
                <div className="row justify-content-between">
                  <div className="col-2">
                    <label htmlFor="summary" className="form-label">
                      Description
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      value={formData.description}
                      onChange={onFormFieldChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-outline p-2">
                <div className="row justify-content-between">
                  <div className="col-2">
                    <label htmlFor="headline" className="form-label">
                      Cost
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      type="text"
                      name="cost"
                      className="form-control"
                      value={formData.cost}
                      onChange={onFormFieldChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <button
                    id="submit"
                    className="btn btn-primary purple-btn"
                    type="button"
                    onClick={submitButtonClick}
                  >
                    Submit
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

export default CodeChallenge;
