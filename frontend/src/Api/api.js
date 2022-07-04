const axios = require("axios").default;
const instance = axios.create({ baseURL: "http://localhost:3001" });
export default instance;
