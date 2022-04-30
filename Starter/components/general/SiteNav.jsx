import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../services/usersService";
import debug from "sabio-debug";

function SiteNav(props) {
  const navigate = useNavigate();
  const _logger = debug.extend("SiteNav");
  const loginCheck = () => {
    if (props.user.isLoggedIn === false) {
      getCurrentUser();
    }
  };

  const getCurrentUser = () => {
    userService
      .getUser()
      .then((response) => {
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
          _logger({ GetbyId: userData });
          return userData;
        });
      })
      .catch();
  };

  useEffect(() => {
    loginCheck();
  }, []);

  const changeButton = () => {
    if (props.user.isLoggedIn === true) {
      logout();
    } else {
      navigate("/login");
    }
  };

  const logout = () => {
    userService.logout().then(() => {
      props.setUserInfo((prevState) => {
        let userData = { ...prevState };

        userData = {
          firstName: "",
          lastName: "",
          email: "",
          avatarUrl: "",
          isLoggedIn: false,
        };
        return userData;
      });
    });
  };

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark"
        aria-label="Fourth navbar example"
      >
        <div className="container">
          <Link to="../" className="navbar-brand">
            <img
              src="https://pw.sabio.la/images/Sabio.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Sabio"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link to="../" className="nav-link px-2 text-white link-button">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="../friends"
                  className="nav-link px-2 text-white link-button"
                >
                  Friends
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="../jobs"
                  className="nav-link px-2 text-white link-button"
                >
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="../techcompanies"
                  className="nav-link px-2 text-white link-button"
                >
                  Tech Companies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="../events"
                  className="nav-link px-2 text-white link-button"
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/formik"
                  className="nav-link px-2 text-white link-button"
                >
                  Formik
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/CC" className="nav-link px-2 text-white link-button">
                  Code Challenge
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/cars"
                  className="nav-link px-2 text-white link-button"
                >
                  Code Challenge 2
                </Link>
              </li>
            </ul>
            <div className="text-end">
              <a
                href="/"
                className="align-items-center mb-2 me-2 mb-lg-0 text-white text-decoration-none"
              >
                {props.user.firstName} {props.user.lastName}
              </a>

              <button
                onClick={changeButton}
                type="button"
                className="btn btn-outline-light me-2"
              >
                {props.user.isLoggedIn ? "Logout" : "Login"}
              </button>

              <Link to="/register" type="button" className="btn btn-warning">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default SiteNav;
