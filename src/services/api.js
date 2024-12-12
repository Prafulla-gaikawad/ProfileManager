import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend API URL
  timeout: 10000,
});

export default instance;
