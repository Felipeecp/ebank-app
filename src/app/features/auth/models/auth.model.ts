export interface LoginCredentials
{
  email: string;
  password: string;
}

export interface RegisterData{
  name: string;
  age: number;
  email: string;
  password: string;
}

export interface AuthResponse{
  token: string,
  email: string;
  name: string;
  accountNumber: string;
}
