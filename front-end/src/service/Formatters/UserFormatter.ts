import { User } from '@/types/user';

export function mapUserParent(mappedUser: User, allUsers: User[]): User {
  const parent: User | undefined = allUsers.find(
    (user) => user.login.toLowerCase() === mappedUser.parent.toLowerCase(),
  );

  return { ...mappedUser, parent: parent?._id ?? '-' };
}

export function mapUserList(users: User[]) {
  return users.map((user) => {
    const foundParent = users.find((usr) => usr._id === user.parent);

    return { ...user, parent: foundParent?.login ?? '-' };
  });
}
