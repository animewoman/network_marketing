import { User } from '@/types/user';

export function formatUser(user: User): User {
  const parent = user.parent;
  if (!parent) {
    return { ...user, parent: '-' };
  }

  return user;
}

export function formatUserList(users: User[]): User[] {
  return users.map((user) => {
    return { ...user, parent: user.parent ?? '-' };
  });
}
