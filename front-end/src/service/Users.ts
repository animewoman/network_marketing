import { User, AuthUser } from '@/types/user';
import { api } from '@/http';
import { formatUserList, formatUser } from '@/service/Formatters/UserFormatter';

export let LOGINNED_USER: AuthUser | null = null;

export async function getUsers(): Promise<User[] | []> {
  const response = await api().get(`/users`);

  return formatUserList(response.data.users);
}

export async function getUser(login: string): Promise<User> {
  const data = `login=${login}`;
  const response = await api().get(`/user/get?${data}`);

  return formatUser(response.data);
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

export async function loginUser(user: AuthUser): Promise<number> {
  const response = await api().post('/auth/login', user);

  if (response.status === 200) {
    LOGINNED_USER = user
  } else {
    LOGINNED_USER = null
  }

  return response.status;
}