import axios from "axios";

const jobsService = {
  endpoint: "https://api.remotebootcamp.dev/api/jobs",
};

const add = (payload) => {
  const postConfig = {
    method: "POST",
    url: jobsService.endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(postConfig);
};

const get = (pageIndex, pageSize) => {
  const getConfig = {
    method: "GET",
    url: `${jobsService.endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(getConfig);
};

const update = (payload, id) => {
  const putConfig = {
    method: "PUT",
    url: `${jobsService.endpoint}/${id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(putConfig);
};

const getById = (id) => {
  const getByIdConfig = {
    method: "GET",
    url: `${jobsService.endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(getByIdConfig);
};

const slug = (slug) => {
  const slugConfig = {
    method: "GET",
    url: `${jobsService.endpoint}/${slug}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(slugConfig);
};

const search = (pageIndex, pageSize, searchString) => {
  const searchConfig = {
    method: "GET",
    url: `${jobsService.endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${searchString}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(searchConfig);
};

const status = (id, statusId) => {
  const statusConfig = {
    method: "PUT",
    url: `${jobsService.endpoint}/${id}/${statusId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(statusConfig);
};

export { add, get, update, getById, slug, search, status };
