import { AppProvider } from "./providers/app-provider";
import { Router } from "./routes";

export const App = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};
