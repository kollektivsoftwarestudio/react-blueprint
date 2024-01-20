import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { afterEach, afterAll, beforeAll } from "vitest";
import { resetDb } from "./server/db";
import { server } from "./server/server";
import "@testing-library/jest-dom/vitest";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// general cleanup
afterEach(async () => {
  queryClient.clear();
  resetDb();
});

beforeEach(() => {
  location.replace("http://localhost");
});

GlobalRegistrator.register();
