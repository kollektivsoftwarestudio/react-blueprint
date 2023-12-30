import { authClient } from "./auth/auth-client";
import { teamsClient } from "./teams/teams-client";
import { usersClient } from "./users/users-client";
export type {
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser,
  UserResponse,
} from "./auth/types";
export type { Team } from "./teams/types";
export type { UpdateProfileDTO } from "./users/types";

export const apiClient = {
  auth: authClient,
  teams: teamsClient,
  users: usersClient,
};
