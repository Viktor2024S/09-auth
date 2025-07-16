// types/user.ts
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface UserAuth {
  email: string;
  password: string;
  username?: string; // Username is optional for login, required for register
}

export interface UserUpdate {
  username?: string;
  avatar?: string;
}

// This interface is crucial for typing API responses for login/register
export interface AuthResponse {
  user: User;
  token?: string; // The actual token is in httpOnly cookie
}
