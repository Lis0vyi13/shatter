import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import { store } from "./redux/app/store.ts";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Provider store={store}>
      <Toaster toastOptions={{ className: "toaster" }} richColors />
      <App />
    </Provider>
  </HelmetProvider>
);
