import { User } from '@/types/user';
import axios from 'axios';

const server = 'http://194.67.105.44:7777';

export async function getUsers(): Promise<User[] | []> {
  const response = await axios.get(`${server}/api/admin/main`);

  return response.data.users;
}

export async function saveUser(user: User): Promise<string> {
  const response = await axios.post(`${server}/api/user/create`, user);

  return response.data;
}

export async function deleteUser(id: string): Promise<User[] | []> {
  const data = { _id: id };
  const response = await axios.post(`${server}/api/user/delete`, data);

  return response.data.data;
}
