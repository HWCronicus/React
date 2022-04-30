import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as userService from "../../services/usersService";
import toastr from "toastr";
import { Formik, Form, Field } from "formik";

function Register() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "https://",
    tenantId: "U02UAGS07S8",
  });

  //#region handlers
  const submit = (values) => {
    setData(values);
    console.log(values);
    userService
      .register(values)
      .then(submitSuccess)
      .then(setData(values))
      .catch(submitError);
  };

  const submitSuccess = (response) => {
    toastr["success"]("You have successfully registered!", "Success");
    console.log({ "Registration Success": response });
  };

  const submitError = (error) => {
    let errors = error.response.data.errors;
    console.log({ "Normal Return": error });
    console.log(errors);
    errors.map((obj) => {
      return toastr["error"](`Registration Unsuccessful. ${obj}`, "Error", {
        timeOut: 0,
        extendedTimeOut: 0,
      });
    });
  };

  //#endregion

  // const onFormFieldChange = (e) => {
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;

  //   setData((prevState) => {
  //     // console.log("updater onChange");

  //     const newFormData = {
  //       ...prevState,
  //     };
  //     newFormData[name] = value;
  //     return newFormData;
  //   });
  // };

  // const onClickSubmit = (e) => {
  //   e.preventDefault(e);
  //   const payload = { ...data };
  //   console.log("payload", payload);
  //   userService.register(payload).then(submitSuccess).catch(submitError);
  // };

  return (
    <React.Fragment>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-5">
            <div className="card shadow">
              <div className="card-body p-5 text-center">
                <h1 className="mb-4">Sign Up</h1>
                <Formik
                  enableReinitialize={true}
                  initialValues={data}
                  onSubmit={(values) => submit(values)}
                >
                  <Form>
                    <div className="form-outline mb-4">
                      <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <Field
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <Field
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        placeholder="Retype Password"
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <Field
                        type="URL"
                        id="avatarUrl"
                        name="avatarUrl"
                        placeholder="Avatar URL"
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-check form-check-inline mb-2">
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        name="agree"
                        id="agree"
                        required
                      />
                      <label className="form-check-label">
                        I agree to the
                        <Link to="/terms" className="fw-bold link-primary">
                          terms
                        </Link>
                      </label>
                    </div>

                    <div className="p-2"></div>

                    <button
                      id="submit"
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Register
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      {/* <code>{JSON.stringify(data, undefined, 2)}</code> */}
    </React.Fragment>
  );
}

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "5000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};
export default Register;
