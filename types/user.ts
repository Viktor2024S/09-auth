export interface User {
  _id: string;
  email: string;
  username?: string;
  avatar?: string;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  avatar?: string | null;
}

export type UserRequest = UserAuth;

export interface CheckSessionResponse {
  message: string;
}
