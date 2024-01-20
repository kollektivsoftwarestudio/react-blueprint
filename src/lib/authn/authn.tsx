import {
  apiClient,
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
} from "@/services/api-client";
import { clearCookie } from "../cookies";

async function handleUserResponse(data: UserResponse) {
  const { sessionToken, user } = data;
  return user;
}

export async function loadUser() {
  const data = await apiClient.auth.getUser();
  return data;
}

export async function loginFn(data: LoginCredentialsDTO) {
  const response = await apiClient.auth.loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

export async function registerFn(data: RegisterCredentialsDTO) {
  const response = await apiClient.auth.registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

export async function logoutFn() {
  // Clear cookies
  clearCookie("session");
  window.location.assign(window.location.origin as unknown as string);
}
