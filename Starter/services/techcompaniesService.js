import axios from "axios";

var techcompaniesService = {
  endpoint: "https://api.remotebootcamp.dev/api/techcompanies",
};

const add = (payload) => {
  const postConfig = {
    method: "POST",
    url: techcompaniesService.endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(postConfig);
};

const get = (pageIndex, pageSize) => {
  const getConfig = {
    method: "GET",
    url: `${techcompaniesService.endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(getConfig);
};

const update = (payload, id) => {
  const putConfig = {
    method: "PUT",
    url: `${techcompaniesService.endpoint}/${id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(putConfig);
};

const getById = (id) => {
  const getByIdConfig = {
    method: "GET",
    url: `${techcompaniesService.endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(getByIdConfig);
};

const slug = (slug) => {
  const slugConfig = {
    method: "GET",
    url: `${techcompaniesService.endpoint}/${slug}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(slugConfig);
};

const search = (pageIndex, pageSize, searchString) => {
  const searchConfig = {
    method: "GET",
    url: `${techcompaniesService.endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${searchString}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(searchConfig);
};

const status = (id, statusId) => {
  const statusConfig = {
    method: "PUT",
    url: `${techcompaniesService.endpoint}/${id}/${statusId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(statusConfig);
};

export { get, add, update, getById, slug, search, status };
