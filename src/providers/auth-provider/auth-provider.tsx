import { loadUser, loginFn, logoutFn, registerFn } from "@/lib/authn";
import { useMutationFn, useQueryFn } from "@/lib/react-query/react-query";
import {
  AuthUser,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
} from "@/services/api-client";
import { UseMutateAsyncFunction, useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useMemo } from "react";

const AuthContext = createContext<{
  user: AuthUser | undefined | null;
  isLoadingUser: boolean;
  isAuthenticating: boolean;
  login: UseMutateAsyncFunction<
    AuthUser,
    unknown,
    LoginCredentialsDTO,
    unknown
  >;
  loginError?: string;
  register: UseMutateAsyncFunction<
    AuthUser,
    unknown,
    RegisterCredentialsDTO,
    unknown
  >;
  registerError?: string;
  reloadUser: () => void;
  logout: () => void;
}>(
  // biome-ignore lint/style/noNonNullAssertion: Ignore for createContext
  null!
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQueryFn({
    queryKey: ["users", "me"],
    queryFn: loadUser,
    staleTime: Infinity,
    retry: false,
  });

  const loginMutation = useMutationFn({
    mutationFn: loginFn,
    onSuccess: (user) => {
      queryClient.setQueryData(["users", "me"], user);
    },
  });

  const registerMutation = useMutationFn({
    mutationFn: registerFn,
    onSuccess: (user) => {
      queryClient.setQueryData(["users", "me"], user);
    },
  });

  const logout = useCallback(() => {
    logoutFn();
    queryClient.resetQueries({ queryKey: ["users", "me"] });
  }, [queryClient]);

  const loginError = useMemo(() => {
    if (loginMutation.error) {
      return (
        (loginMutation.error as { message: string }).message ?? "Unknown Error"
      );
    }
    return undefined;
  }, [loginMutation.error]);

  const registerError = useMemo(() => {
    if (registerMutation.error) {
      return (
        (registerMutation.error as { message: string }).message ??
        "Unknown Error"
      );
    }
    return undefined;
  }, [registerMutation.error]);

  return (
    <AuthContext.Provider
      value={{
        logout,
        login: loginMutation.mutateAsync,
        loginError,
        register: registerMutation.mutateAsync,
        registerError,
        reloadUser: () =>
          queryClient.refetchQueries({ queryKey: ["users", "me"] }),
        user: data,
        isLoadingUser: isLoading,
        isAuthenticating: loginMutation.isPending || registerMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
