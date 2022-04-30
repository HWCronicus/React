import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../services/usersService";
import toastr from "toastr";

function Login(props) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    tenantId: "U02UAGS07S8",
  });

  const navigate = useNavigate();

  const getCurrentUser = () => {
    userService
      .getUser()
      .then((response) => {
        // console.log(response)
        getUserInfo(response.data.item.id);
      })
      .catch();
  };

  const getUserInfo = (id) => {
    userService
      .getUserById(id)
      .then((response) => {
        let responseData = response.data.item;
        props.setUserInfo((prevState) => {
          let userData = { ...prevState };

          userData = {
            firstName: responseData.firstName,
            lastName: responseData.lastName,
            email: responseData.email,
            avatarUrl: responseData.avatarUrl,
            isLoggedIn: true,
          };
          return userData;
        });
        navigate("/");
      })
      .catch();
  };

  const onFormFieldChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setLoginData((loginData) => {
      // console.log("updater onChange");

      const newFormData = {
        ...loginData,
      };
      newFormData[name] = value;
      return newFormData;
    });
  };

  const onClickHandler = (e) => {
    e.preventDefault(e);
    login();
  };

  const login = () => {
    userService.login(loginData).then(loginSuccess).catch(loginError);
  };

  const loginSuccess = (response) => {
    console.log(response);
    getCurrentUser();
    toastr["success"]("Login successful", "Success");
  };

  const loginError = (error) => {
    let errors = error.response.data.errors;
    let status = error.response.status;
    console.log({ error: error });
    if (status === 500) {
      toastr["error"](
        `Login unsuccessful. Invalid email address and/or password `,
        "Error",
        { timeOut: 10000, extendedTimeOut: 10000 }
      );
    } else if (status === 400) {
      toastr["error"](`Login unsuccessful. ${errors}`, "Error", {
        timeOut: 10000,
        extendedTimeOut: 10000,
      });
    } else {
      toastr["error"](`Login unsuccessful. ${errors}`, "Error", {
        timeOut: 10000,
        extendedTimeOut: 10000,
      });
    }
  };

  return (
    <React.Fragment>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-5">
            <div className="card shadow-sm" style={{ borderRadius: "20px" }}>
              <div className="card-body p-5 text-center">
                <h1 className="mb-4">Sign in</h1>

                <div className="form-outline mb-4">
                  <label className="form-label mb-3 h6">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    value={loginData.email}
                    onChange={onFormFieldChange}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label mb-3 h6">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                    value={loginData.password}
                    onChange={onFormFieldChange}
                  />
                </div>

                <div className="form-check d-flex justify-content-start mb-2">
                  <Link to="/forgot" className="link-primary">
                    Forgot password
                  </Link>
                </div>
                <div className="form-check d-flex justify-content-start mb-2">
                  <Link to="/register" className="link-primary">
                    Register a new membership
                  </Link>
                </div>
                <div className="p-2"></div>
                <button
                  id="submit"
                  className="btn btn-primary btn-lg btn-block"
                  type="button"
                  onClick={onClickHandler}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <code>{JSON.stringify(data, undefined, 2)}</code> */}
    </React.Fragment>
  );
}

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: true,
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

export default Login;
