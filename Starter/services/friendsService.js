import axios from "axios";

const friendsService = {
  endpoint: "https://localhost:50001/api/friends",
};

let add = (payload) => {
  const postConfig = {
    method: "POST",
    url: friendsService.endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(postConfig);
};

let get = (pageIndex, pageSize) => {
  const getConfig = {
    method: "GET",
    url: `${friendsService.endpoint}/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(getConfig);
};

let update = (payload, id) => {
  const putConfig = {
    method: "PUT",
    url: `${friendsService.endpoint}/${id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(putConfig);
};

let getById = (id) => {
  const getByIdConfig = {
    method: "GET",
    url: `${friendsService.endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(getByIdConfig);
};

let remove = (id) => {
  const deleteConfig = {
    method: "DELETE",
    url: `${friendsService.endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(deleteConfig).then(() => {
    return id;
  });
};

let search = (pageIndex, pageSize, searchString) => {
  const searchConfig = {
    method: "GET",
    url: `${friendsService.endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${searchString}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(searchConfig);
};

let status = (id, statusId) => {
  const statusConfig = {
    method: "PUT",
    url: `${friendsService.endpoint}/${id}/${statusId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(statusConfig);
};

let slug = (slug) => {
  const slugConfig = {
    method: "GET",
    url: `${friendsService.endpoint}/${slug}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(slugConfig);
};

export { add, get, getById, update, remove, search, status, slug };
