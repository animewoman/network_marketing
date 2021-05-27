import { User } from '@/types/user';

export async function getUsers(): Promise<User[]> {
  const user: User = {
    userName: 'Bob',
    password: '123',
    rank: 'Genin',
    phone: '999003004',
    registrationDate: '12.04.2019',
  };
  const user2: User = {
    userName: 'Lee',
    password: '123',
    rank: 'Jounin',
    phone: '999003004',
    registrationDate: '18.02.2021',
  };

  return [user, user2];
}
