import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,

});
export const backendURL = import.meta.env.VITE_BACKEND_URL;



api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("access");


        if(
            token &&
            !config.url.includes("/signup/")
        ) {

            config.headers.Authorization =
            `Bearer ${token}`;

        }


        return config;

    }
);


export default api;