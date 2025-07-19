export interface User {
  avatar: string;
  email: string;
  username: string;
}

export interface UserRequest {
  password: string;
  email: string;
}

export interface CheckSessionResponse {
  message: string;
}
