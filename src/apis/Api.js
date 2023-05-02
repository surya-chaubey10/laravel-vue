import axios from "axios";

let Api = axios.create({
  baseURL: "https://employee-api.harissint.com/public/api/"
});
// baseURL: "https://employee.harissint.com/api/public/index.php/api/"
// baseURL: "http://127.0.0.1:8000/api/"

Api.defaults.withCredentials = true;

export default Api;
