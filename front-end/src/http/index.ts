import axios from 'axios';

export default function http(root = '') {
  return axios.create({
    baseURL: `http://194.67.105.44:7777${root}`,
    validateStatus: () => true,
  });
}

export function api() {
  return http('/api');
}
