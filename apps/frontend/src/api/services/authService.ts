import axiosClient from "../axiosClient";

interface LoginResponse {
  access_token: string;
  userId: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface SignupRequest {
  username: string;
  password: string;
}

interface SignupResponse {
  access_token: string;
  userId: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await axiosClient.post<LoginResponse>(
      "/users/login",
      credentials
    );
    return data;
  },
  register: async (credentials: RegisterRequest): Promise<LoginResponse> => {
    const { data } = await axiosClient.post<LoginResponse>(
      "/users/register",
      credentials
    );
    return data;
  },
};
