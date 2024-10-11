import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

const configFunc = async (config: InternalAxiosRequestConfig<any>) => {
  const AUTH_TOKEN = await AsyncStorage.getItem('token');

  if (!config.headers) {
    config.headers = new AxiosHeaders()
  }
  config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
  return config;
};

const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});

http.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json';
  return config;
});

http.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => configFunc(config));

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // await AsyncStorage.removeItem("token");
      // await AsyncStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default http;