import { User, UserDTO } from '@/types/user';

export function formatUser(user: UserDTO): User {
  const parent = user.parent.login;

  return { ...user, parent };
}

export function formatUserList(users: UserDTO[]): User[] {
  return users.map((user) => {
    const foundParent = users.find((usr) => usr.login === user.parent.login);

    return { ...user, parent: foundParent?.login ?? '-' };
  });
}
