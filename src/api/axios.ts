import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { showToast } from '../utils/toast';
import { baseURL } from '../component/api/axios';

export const DUMMY_IMAGE = `${baseURL}/uploads/doctor/consultant-physician126.png`;
export const Icon_Url = `https://thepacificindia.com/`;

const api = axios.create({
  // baseURL: 'https://www.papers.withupartners.in/api/',
  baseURL: 'https://thepacificindia.com/api/',

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
