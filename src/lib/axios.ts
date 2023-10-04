import axios from 'axios';
import { auth } from '@/firebase/config';

const baseURL = process.env.NEXT_PUBLIC_API_URL,
  isServer = typeof window === 'undefined';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers'),
      token = cookies().get('token')?.value;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } else {
    const tokenResult = await auth.currentUser?.getIdTokenResult();
    const token = tokenResult?.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
