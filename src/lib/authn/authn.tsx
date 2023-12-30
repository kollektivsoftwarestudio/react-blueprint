import { storage } from "@/services/storage";
import {
  apiClient,
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
} from "@/services/api-client";

async function handleUserResponse(data: UserResponse) {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

export async function loadUser() {
  if (storage.getToken()) {
    const data = await apiClient.auth.getUser();
    return data;
  }
  return null;
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
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}
