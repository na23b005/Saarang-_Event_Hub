import axios from 'axios';

// Set up axios interceptors
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    // Auto logout if 401 response returned from api
    if (err.response.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

// Set default base URL for local development
// This is overridden by the proxy in package.json during development
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = '/api';
}

// Check if token exists and set auth header
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;