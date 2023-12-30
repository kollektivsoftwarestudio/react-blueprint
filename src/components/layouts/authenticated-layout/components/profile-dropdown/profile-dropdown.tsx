import { cn } from "@/design-system/utils/cn";
import { useAuth } from "@/providers/auth-provider";
import { useAuthenticatedUser } from "@/providers/authenticated-user-provider";
import { routes } from "@/routes/routes";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/outline";
import { Fragment, useMemo } from "react";
import { NavLink } from "react-router-dom";

export const ProfileDropdown = () => {
  const { user } = useAuthenticatedUser();
  const { logout } = useAuth();

  const userNavigation = useMemo(
    () =>
      [
        { name: "Your Profile", to: routes.app.profile() },
        {
          name: "Sign out",
          to: "",
          onClick: () => {
            logout();
          },
        },
      ].filter(Boolean),
    [logout],
  );

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <div className="h-8 w-8 min-w-8 min-h-8 bg-gray-100 rounded-full flex justify-center items-center">
          <UserIcon className="h-5 w-5 min-w-5 min-h-5 stroke-2 text-gray-900" />
        </div>
        <span className="hidden lg:flex lg:items-center">
          <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
            {user.firstName}
          </span>
          <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <NavLink
                  onClick={item.onClick}
                  to={item.to}
                  className={cn(
                    active ? "bg-gray-50" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900",
                  )}
                >
                  {item.name}
                </NavLink>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
