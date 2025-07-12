export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface AuthRequest {
  email?: string;
  password?: string;
  username?: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}
