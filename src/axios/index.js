import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const API_URL = 'http://192.168.1.244:8787';

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(async config => {
  config.headers = config.headers || {};

  const token = await AsyncStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
