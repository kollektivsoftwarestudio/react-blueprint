import { AuthUser } from "..";
import { baseClient } from "../base-client";
import { UpdateProfileDTO } from "./types";

export const usersClient = {
  updateProfile: async (data: UpdateProfileDTO) =>
    baseClient.patch<AuthUser[]>("/users/profile", data),
  getUsers: async () => baseClient.get<AuthUser[]>("/users"),
  deleteUser: async (userId: string) => baseClient.delete<AuthUser[]>(`/users/${userId}`),
};
