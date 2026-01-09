import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(config => {
  const key = import.meta.env.VITE_KAKAO_REST_API_KEY;
  if (key) {
    config.headers.Authorization = `KakaoAK ${key}`;
  }
  return config;
});
