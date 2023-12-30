export enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type RoleType = keyof typeof ROLES;

export const POLICIES = {
  "comment:delete": (role: string, userId: string, commentAuthorId: string) => {
    if (role === "ADMIN") {
      return true;
    }

    if (role === "USER" && commentAuthorId === userId) {
      return true;
    }

    return false;
  },
};

export type Policy = keyof typeof POLICIES;

export const checkAccess = ({
  allowedRoles,
  userRole,
}: { allowedRoles: RoleType[]; userRole: RoleType }) => {
  if (allowedRoles.length > 0) {
    return allowedRoles.includes(userRole);
  }

  return true;
};
