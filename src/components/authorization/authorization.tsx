import { RoleType } from "@/lib/authz";
import { useAuthenticatedUser } from "@/providers/authenticated-user-provider";

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleType[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { hasRole } = useAuthenticatedUser();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = hasRole(allowedRoles);
  }

  if (typeof policyCheck !== "undefined") {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
