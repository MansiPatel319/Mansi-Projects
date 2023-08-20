import axios from "axios";

const instance = axios.create({
  // baseURL:"http://127.0.0.1:8000/api/"
  baseURL: "https://api.youhue.com/api/",
  // baseURL: "http://174.129.101.106/api/",
  
});

export default instance;


export const baseUrl = "https://api.youhue.com/api/"