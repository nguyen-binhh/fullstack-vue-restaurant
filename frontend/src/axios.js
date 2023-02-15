import axios from "axios";

window.axios = axios;
axios.defaults.withCredentials = false;

let backendUrl = "https://api-nodejs-food.onrender.com/api/v1";
axios.defaults.baseURL = backendUrl;
