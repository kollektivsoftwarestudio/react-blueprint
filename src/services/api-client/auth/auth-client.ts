import { baseClient } from "../base-client";
import { AuthUser, LoginCredentialsDTO, RegisterCredentialsDTO, UserResponse } from "./types";

export const authClient = {
  getUser: async () => baseClient.get<AuthUser>("/auth/me"),
  loginWithEmailAndPassword: async (data: LoginCredentialsDTO) =>
    baseClient.post<UserResponse>("/auth/login", data),
  registerWithEmailAndPassword: async (data: RegisterCredentialsDTO) =>
    baseClient.post<UserResponse>("/auth/register", data),
};
