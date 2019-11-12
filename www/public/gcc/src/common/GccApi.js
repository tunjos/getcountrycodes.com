import axios from "axios";

export const GccApi = axios.create({
  baseURL: process.env.GCC_HOST
});

GccApi.login = params => {
  return GccApi.post("/api/login", params);
};

GccApi.register = params => {
  return GccApi.post("/api/register", params);
};

GccApi.verify = params => {
  return GccApi.post("/api/verify", params);
};
