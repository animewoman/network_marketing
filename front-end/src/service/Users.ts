import { User } from '@/types/user';
import axios from 'axios';

export async function getUsers(): Promise<User[] | []> {
  const response = await axios.get('http://194.67.105.44:7777/api/admin/main');

  return response.data.users;
}

export async function saveUser(user: User): Promise<string> {
  const response = await axios.post('http://194.67.105.44:7777/api/user/create', user);

  return response.data;
}
