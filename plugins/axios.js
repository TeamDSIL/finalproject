// plugins/axios.js
export default function({ $axios }) {
    $axios.onRequest(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  
    $axios.onError(error => {
      const code = parseInt(error.response && error.response.status);
      if (code === 401) {
        // Handle unauthorized errors
      }
      return Promise.reject(error);
    });
  }