import axios from "axios";

const usersService = {
  endpoint: "https://api.remotebootcamp.dev/api/users",
};

let login = (payload) => {
  const loginConfig = {
    method: "POST",
    url: usersService.endpoint + "/login",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(loginConfig);
};

let logout = () => {
  const logoutConfig = {
    method: "GET",
    url: usersService.endpoint + "/logout",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(logoutConfig);
};

let register = (payload) => {
  const registerConfig = {
    method: "POST",
    url: usersService.endpoint + "/register",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(registerConfig);
};

let getUser = () => {
  const getCurrentConfig = {
    method: "GET",
    url: usersService.endpoint + "/current",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(getCurrentConfig);
  // .catch(axiosError);
};

let getUserById = (id) => {
  const byIdConfig = {
    method: "GET",
    url: usersService.endpoint + `/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(byIdConfig);
};

export { login, logout, register, getUser, getUserById };

// let axiosError = (err) => {
//   if (err.hasOwnProperty("response") == true) {
//     if (err.response.status == 401) {
//       window.location.href = `/Starter%20Tasks/login.html`;
//     } else {
//       console.warn({ "Axios Error": err });
//     }
//   } else {
//     console.warn({ "Axios Error": err });
//   }
// };

// function logout() {
//   userLogout()
//     .then((response) => {
//       console.log("Logout userService");
//       window.location.href = `/Starter%20Tasks/login.html`;
//     })
//     .catch(axiosError);
// }

// getUser = () => {
//   getCurrentUser()
//     .then((obj) => {
//       var id = obj.data.item.id;
//       getUserData(id);
//     })
//     .catch((obj) => {
//       axiosError(obj);
//     });
// };

// getUserData = (id) => {
//   getUserById(id)
//     .then((obj) => {
//       let userData = obj.data.item;
//       displayLogin(userData);
//     })
//     .catch((obj) => {
//       axiosError(obj);
//     });
// };
