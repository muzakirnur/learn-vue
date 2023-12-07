import axios from "axios";

const Api = axios.create({
  /* Url end Point */
  baseURL: "http://laravel.test",
});

export default Api;
