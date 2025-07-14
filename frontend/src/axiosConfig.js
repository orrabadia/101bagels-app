import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5500/'
    : '/api/items';


  axios.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });
