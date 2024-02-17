import axios from "axios";

const axiosInstance = axios.create({
    // baseURL:"http://127.0.0.1:5001/shopping-clone-c199a/us-central1/api",//firebase function

    baseURL:"https://amazon-api-1ncw.onrender.com"//deployed on render
});

export {axiosInstance}

