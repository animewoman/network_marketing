export interface User {
  _id: string;
  login: string;
  fullName: string;
  password: string;
  phone: string;
  email: string;
  parent: string;
  score?: number;
  region?: string;
  status?: string;
}

export interface AuthUser {
  login: string;
  isAdmin: boolean;
  password?: string;
}
