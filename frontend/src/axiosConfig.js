import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5500/'
    : '/api/items';
