import axios from "axios";
import Cookies from 'js-cookie';


const csrfToken = Cookies.get("csrftoken");
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials:true,
    headers:{
        'Content-Type':'application/json',
        ...(csrfToken && { "X-CSRFTOKEN":csrfToken}),
    },
});

export default apiClient;