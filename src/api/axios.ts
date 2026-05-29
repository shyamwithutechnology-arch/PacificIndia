import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { showToast } from '../utils/toast';
export const baseURL = 'https://www.paperfast.in/api/';
export const iconUrl = 'https://www.paperfast.in/';
const api = axios.create({
  // baseURL: 'https://www.papers.withupartners.in/api/',
  baseURL: 'https://www.paperfast.in/api/',

  timeout: 60000, // 20 second
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const net = await NetInfo.fetch();

    if (!net.isConnected) {
      // toast.error('No internet connection', '');
      showToast('error', 'Connection issue', 'No internet connection');
      return Promise.reject({ offline: true });
    }

    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
