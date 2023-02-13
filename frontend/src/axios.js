import axios from "axios";

window.axios = axios;
axios.defaults.withCredentials = false;

let backendUrl = "http://localhost:3000/api/v1";
axios.defaults.baseURL = backendUrl;
