import axios from 'axios';
import { AuthUser } from '@/types/user';

function auth() {
  return axios.create({
    baseURL: `http://194.67.105.44:7777/api/auth`,
    validateStatus: () => true,
  });
}

function rfrsh() {
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.create({
    baseURL: `http://194.67.105.44:7777/api/auth`,
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    validateStatus: () => true,
  });
}

function refreshTokenDelay() {
  const timer = localStorage.getItem('timer');

  window.setTimeout(getNewAccessToken, Number(timer));
}

export async function getNewAccessToken() {
  const response = await rfrsh().post('/refresh-token');

  if (!response.data) {
    return;
  }

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  localStorage.setItem('accessToken', `${response.data.newTokens.accessToken}`);
  localStorage.setItem('refreshToken', `${response.data.newTokens.refreshToken}`);

  refreshTokenDelay();
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
  const minute = 1000 * 60;
  const timer = minute * 20;
  localStorage.setItem('timer', String(timer));

  window.setTimeout(getNewAccessToken, timer);

  return response;
}

export async function logoutUser() {
  await api().post('/auth/logout');

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('timer');
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
