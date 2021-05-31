import { User } from '@/types/user';
import { api } from '@/http';

export async function getUsers(): Promise<User[] | []> {
  const response = await api().get(`/users`);

  return response.data.users;
}

export async function getUser(id: string): Promise<User> {
  const data = `_id=${id}`;
  const response = await api().get(`/user/get?${data}`);

  return response.data;
}

export async function saveUser(user: User): Promise<string> {
  const response = await api().post(`/user/create`, user);

  return response.data;
}

export async function updateUser(user: User): Promise<User> {
  const response = await api().put('/user/update', user);

  return response.data;
}

export async function deleteUser(id: string): Promise<string> {
  const data = { _id: id };
  const response = await api().post('/user/delete', data);

  return response.data;
}
