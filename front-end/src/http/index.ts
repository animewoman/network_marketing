import axios from 'axios';
import { AuthUser } from '@/types/user';

function auth() {
  return axios.create({
    baseURL: `http://194.67.105.44:7777/api/auth`,
    validateStatus: () => true,
  });
}

export async function loginUser(user: AuthUser) {
  const response = await auth().post('/login', user);

  if (!response.data.tokens) {
    return response.data.message;
  }

  const accessToken = response.data.tokens.accessToken;
  const refreshToken = response.data.tokens.refreshToken;

  localStorage.setItem('accessToken', `${accessToken}`);
  localStorage.setItem('refreshToken', `${refreshToken}`);

  return response;
}

export default function http(root = '') {
  const accessToken = localStorage.getItem('accessToken');

  return axios.create({
    baseURL: `http://194.67.105.44:7777${root}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
  });
}

export function api() {
  return http('/api');
}
