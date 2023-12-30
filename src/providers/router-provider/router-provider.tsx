import { RouterProvider as ReactAriaRouterProvider } from "react-aria-components";

type RouterProviderProps = {
  children: React.ReactNode;
  navigate: (to: string) => void;
};

export const RouterProvider = ({ children, navigate }: RouterProviderProps) => {
  return <ReactAriaRouterProvider navigate={navigate}>{children}</ReactAriaRouterProvider>;
};
