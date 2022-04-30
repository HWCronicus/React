import axios from "axios";

const entitiesService = {
  endpoint: "https://api.remotebootcamp.dev/api/entities/products",
};

const post = (payload) => {
  const postConfig = {
    method: "POST",
    url: entitiesService.endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(postConfig);
};

export { post };
