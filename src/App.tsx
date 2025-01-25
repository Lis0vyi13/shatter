import { RouterProvider } from "react-router-dom";

import { useApp } from "./hooks/useApp";
import { router } from "./router";

function App() {
  useApp();
  return (
    <div className="flex flex-col min-h-full flex-1">
      <RouterProvider
        future={{
          v7_startTransition: true,
        }}
        router={router}
      />
    </div>
  );
}

export default App;
