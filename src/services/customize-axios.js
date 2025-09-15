import axios from "axios";
const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    let res = {};
    if (error.response) {
      // Request made and server responded
      res.data = error.response.data;
      res.status = error.response.status;
      res.headers = error.response.headers;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request
      console.log("Error", error.message);
    }
    return res;
  }
);

export default instance;
