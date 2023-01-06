import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://ecommerce-mernapp.onrender.com/"
})