export const routes = {
  auth: {
    login: () => "/auth/login",
    register: () => "/auth/register",
  },
  app: {
    dashboard: () => "/app",
    profile: () => "/app/profile",
    users: () => "/app/users",
    discussions: {
      list: () => "/app/discussions",
      details: (id: string) => `/app/discussions/${id}`,
    },
  },
  landing: () => "/",
};
