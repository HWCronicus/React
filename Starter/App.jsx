import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import SiteNav from "./components/general/SiteNav";
import Footer from "./components/general/Footer";
import Home from "./components/general/Home";
import Friends from "./components/friends/Friends";
import FriendForm from "./components/friends/FriendForm";
import Jobs from "./components/jobs/Jobs";
import JobsForm from "./components/jobs/JobsForm";
import Companies from "./components/techcompanies/Companies";
import Events from "./components/events/Events";
import Basic from "./components/Formik/Basic";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import CC from "./components/CodeChallenge/CodeChallenge";
import Cars from "./components/CodeChallenge/Car/Cars";

function App() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatarUrl: "",
    isLoggedIn: false,
  });

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <SiteNav user={userInfo} setUserInfo={setUserInfo} />
        </div>
        <div className="row">
          <Routes>
            <Route path="/" element={<Home user={userInfo} />}></Route>
            <Route
              path="/friends"
              element={<Friends user={userInfo} />}
            ></Route>
            <Route
              path="/friends/new"
              element={<FriendForm user={userInfo} />}
            ></Route>
            <Route
              path="/friends/:friendId"
              element={<FriendForm user={userInfo} />}
            ></Route>
            <Route path="/jobs" element={<Jobs user={userInfo} />}></Route>
            <Route
              path="/jobs/new"
              element={<JobsForm user={userInfo} />}
            ></Route>
            <Route
              path="/jobs/:jobId"
              element={<JobsForm user={userInfo} />}
            ></Route>
            <Route
              path="/techcompanies"
              element={<Companies user={userInfo} />}
            ></Route>
            <Route path="/events" element={<Events />}></Route>
            <Route path="/Formik" element={<Basic />}></Route>
            <Route
              path="/login"
              element={<Login setUserInfo={setUserInfo} />}
            ></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/CC" element={<CC />}></Route>
            <Route path="/cars" element={<Cars />}></Route>
          </Routes>
        </div>
        <div className="row">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
