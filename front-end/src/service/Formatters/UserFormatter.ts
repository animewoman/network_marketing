import { User } from '@/types/user';
import moment from 'moment';

export function formatUser(user: User): User {
  const parent = user.parent;
  const date = moment(user.date).format('DD.MM.YYYY');

  if (!parent) {
    return { ...user, date, parent: '-' };
  }

  return { ...user, date };
}

export function formatUserList(users: User[]): User[] {
  return users.map((user) => {
    return { ...user, parent: user.parent ? user.parent : '-' };
  });
}
