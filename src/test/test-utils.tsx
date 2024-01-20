import { render as rtlRender, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { discussionGenerator, userGenerator } from "./data-generators";
import { db } from "./server/db";
import { authenticate, hash_unsafe } from "./server/utils";
import { AppProvider } from "@/providers/app-provider";
import { setCookie } from "@/lib/cookies";
import { queryClient } from "./setup";

export const createUser = async (userProperties?: any) => {
  const user = userGenerator(userProperties);
  db.user.create({ ...user, password: hash_unsafe(user.password) });
  return user;
};

export const createDiscussion = async (discussionProperties?: any) => {
  const discussion = discussionGenerator(discussionProperties);
  const res = db.discussion.create(discussion);
  return res;
};

export const loginAsUser = async (user: any) => {
  const authUser = await authenticate(user);
  setCookie("session", authUser.sessionToken);
  return authUser;
};

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [...screen.queryAllByTestId(/loading/i), ...screen.queryAllByText(/loading/i)],
    { timeout: 4000 },
  );

const initializeUser = async (user: any) => {
  if (typeof user === "undefined") {
    return await loginAsUser(await createUser());
  }

  if (user) {
    return await loginAsUser(user);
  }

  return null;
};

// eslint-disable-next-line import/export
export const render = async (
  ui: any,
  { route = "/", user, ...renderOptions }: Record<string, any> = {},
) => {
  // if you want to render the app unauthenticated then pass "null" as the user
  user = await initializeUser(user);

  window.history.pushState({}, "Test page", route);

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: (args) => <AppProvider {...args} queryClient={queryClient} />,
      ...renderOptions,
    }),
    user,
  };

  await waitForLoadingToFinish();

  return returnValue;
};

export * from "@testing-library/react";
export { userEvent, rtlRender };
