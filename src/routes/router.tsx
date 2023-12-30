import { AuthenticatedLayout } from "@/components/layouts/authenticated-layout";
import { lazyImport } from "@/lib/lazy-import";
import { useAuth } from "@/providers/auth-provider";
import { AuthenticatedUserProvider } from "@/providers/authenticated-user-provider";
import { RouterProvider } from "@/providers/router-provider";
import { Outlet, Route, Routes, useNavigate, useRoutes } from "react-router-dom";
import { routes } from "./routes";

const { Register } = lazyImport(() => import("@/scenes/auth"), "Register");
const { Login } = lazyImport(() => import("@/scenes/auth"), "Login");
const { NotFound } = lazyImport(() => import("@/scenes/not-found"), "NotFound");
const { Landing } = lazyImport(() => import("@/scenes/landing"), "Landing");
const { Dashboard } = lazyImport(() => import("@/scenes/dashboard"), "Dashboard");
const { Profile } = lazyImport(() => import("@/scenes/profile"), "Profile");
const { Users } = lazyImport(() => import("@/scenes/users"), "Users");
const { Discussions } = lazyImport(() => import("@/scenes/discussions"), "Discussions");
const { DiscussionPage } = lazyImport(() => import("./pages/discussion-page"), "DiscussionPage");

export const Router = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const element = useRoutes(
    [
      { path: "/", element: <Landing /> },
      user
        ? {
            path: "/app",
            element: (
              <AuthenticatedUserProvider user={user}>
                <AuthenticatedLayout>
                  <Outlet />
                </AuthenticatedLayout>
              </AuthenticatedUserProvider>
            ),
            children: [
              { path: "", element: <Dashboard /> },
              { path: "profile", element: <Profile /> },
              {
                path: "discussions",
                element: <Discussions />,
              },
              { path: "discussions/:discussionId", element: <DiscussionPage /> },
              { path: "users", element: <Users /> },
              {
                path: "*",
                element: (
                  <NotFound goBackText="Return to Dashboard" goBackUrl={routes.app.dashboard()} />
                ),
              },
            ],
          }
        : undefined,
      {
        path: "/auth/*",
        element: (
          <Routes>
            <Route
              path="register"
              element={<Register onSuccess={() => navigate(routes.app.dashboard())} />}
            />
            <Route
              path="login"
              element={<Login onSuccess={() => navigate(routes.app.dashboard())} />}
            />
          </Routes>
        ),
      },
      {
        path: "*",
        element: <NotFound goBackText="Return to Homepage" goBackUrl={routes.landing()} />,
      },
    ].filter(Boolean),
  );

  return <RouterProvider navigate={navigate}>{element}</RouterProvider>;
};
