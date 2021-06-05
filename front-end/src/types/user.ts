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
  inn?: string | number;
}

export interface AuthUser {
  login: string;
  password: string;
}
