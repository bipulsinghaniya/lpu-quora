


// import axios from "axios";

// const api = axios.create({
//   // baseURL: "http://localhost:5000/api",
//    baseURL: "https://lpuquora-backend.onrender.com/api",
// });

// api.interceptors.request.use((config) => {
//   const auth = JSON.parse(localStorage.getItem("auth"));
//   const token = auth?.token;

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });


// export default api;




///// mai 


// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // 🔥 HARD-CODED LOCAL BACKEND
//   withCredentials: true,
// });




// // Attach JWT token if present
// api.interceptors.request.use(
//   (config) => {
//     const auth = JSON.parse(localStorage.getItem("auth"));
//     const token = auth?.token;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;







import axios from "axios";

const api = axios.create({
  baseURL: "https://lpuquora-backend.onrender.com/api", // 🔥 HARD-CODED BACKEND
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
