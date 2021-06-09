import { api } from '@/http';
import { User } from '@/types/user';
import { formatUserList, formatUser } from '@/service/Formatters/UserFormatter';
import { showNotification } from '@/service/Notifications';

interface Response {
  data: any;
  message?: string;
  status?: number;
}

export async function getUsers(): Promise<User[] | []> {
  const response = await api().get(`/users`);

  return formatUserList(response.data.data);
}

export async function getUser(login: string): Promise<User> {
  const data = `login=${login}`;
  const response = await api().get(`/user/get?${data}`);

  return formatUser(response.data.data);
}

export async function saveUser(user: User): Promise<Response> {
  const response = await api().post(`/user/create`, user);

  //проверку поменять на response.data.data
  if (response.status === 201) {
    showNotification(`Пользователь ${user.login} зарегестрирован`, 'positive');
  }

  if (response.data.message) {
    showNotification(`${response.data.message}`, 'negative');
  }

  return { data: response.data.data, message: response.data.messsage };
}

export async function updateUser(user: User): Promise<User> {
  const response = await api().put('/user/update', user);

  if (response.status === 200) {
    showNotification(`Данные пользователя ${user.login} изменены`, 'info');
  }

  return response.data;
}

export async function deleteUser(user: User): Promise<string> {
  const data = { _id: user._id };
  const response = await api().post('/user/delete', data);

  if (response.status === 200) {
    showNotification(`Пользователь ${user.login} удален!`, 'warning');
  }

  return response.data;
}
