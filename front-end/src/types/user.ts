export interface User {
  _id: string;
  login: string;
  password: string;
  phone: string;
  email: string;
  parent: string;
  money?: number;
}
