export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserAuth {
  email: string;
  password?: string;
}

export interface UserUpdate {
  username?: string;
  avatar?: string;
}
