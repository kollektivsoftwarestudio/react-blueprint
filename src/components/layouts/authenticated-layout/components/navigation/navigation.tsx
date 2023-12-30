import { cn } from "@/design-system/utils/cn";
import { useAuthenticatedUser } from "@/providers/authenticated-user-provider";
import { routes } from "@/routes/routes";
import { ChatBubbleLeftRightIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  const { hasRole } = useAuthenticatedUser();

  const navigation = useMemo(
    () =>
      [
        { name: "Dashboard", to: routes.app.dashboard(), icon: HomeIcon },
        { name: "Discussions", to: routes.app.discussions.list(), icon: ChatBubbleLeftRightIcon },

        hasRole(["ADMIN"]) && {
          name: "Users",
          to: routes.app.users(),
          icon: UserGroupIcon,
        },
      ].filter(Boolean),
    [hasRole],
  );

  return (
    <ul className="space-y-1">
      {navigation.map((item, index) => (
        <NavLink
          key={item.to}
          end={index === 0}
          to={item.to}
          className={({ isActive }) =>
            cn(
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800",
              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
            )
          }
        >
          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          {item.name}
        </NavLink>
      ))}
    </ul>
  );
};
