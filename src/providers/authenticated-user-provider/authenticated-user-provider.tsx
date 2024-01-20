import { RoleType, checkAccess } from "@/lib/authz";
import { AuthUser } from "@/services/api-client";
import { createContext, useContext } from "react";

const AuthenticatedUserContext = createContext<{
  user: AuthUser;
  hasRole: (allowedRoles: RoleType[]) => boolean;
}>(
  // biome-ignore lint/style/noNonNullAssertion: Ignore for createContext
  null!
);

export const useAuthenticatedUser = () => {
  const context = useContext(AuthenticatedUserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthenticatedUserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: AuthUser;
}) => {
  return (
    <AuthenticatedUserContext.Provider
      value={{
        user,
        hasRole: (allowedRoles: RoleType[]) =>
          checkAccess({ userRole: user.role, allowedRoles }),
      }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
