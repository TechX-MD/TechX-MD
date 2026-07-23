const axios = require("axios");

const api = axios.create({
    baseURL: "https://techx-api-1.onrender.com",
    timeout: 30000
});

module.exports = api;
