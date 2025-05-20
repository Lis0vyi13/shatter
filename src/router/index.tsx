import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "@/layouts/HomeLayout";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import ChatLayout from "@/layouts/ChatLayout";

import HomePage from "@/pages/HomePage";
import ChatPage from "@/pages/ChatPage";
import ChatRoomPage from "@/pages/ChatRoomPage";
import ArchivePage from "@/pages/ArchivePage";
import AuthPage from "@/pages/Auth/AuthPage";
import CreatePasswordPage from "@/pages/Auth/CreatePasswordPage";
import ForgotPasswordPage from "@/pages/Auth/ForgotPasswordPage";

import ChatAccessGuard from "@/components/pages/Chat/ChatAccessGuard";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <AuthPage />,
        },
        {
          path: "sign-up",
          element: <AuthPage />,
        },
        {
          path: "create-password",
          element: <CreatePasswordPage />,
        },
        {
          path: "forgot-password",
          element: <ForgotPasswordPage />,
        },
      ],
    },
    {
      element: <MainLayout />,
      children: [
        {
          element: <ChatLayout />,
          children: [
            {
              path: "c",
              element: <ChatPage />,
            },
            {
              path: "archive",
              element: <ArchivePage />,
            },
            {
              path: "archive/:id",
              element: (
                <ChatAccessGuard>
                  <ChatRoomPage />
                </ChatAccessGuard>
              ),
            },

            {
              path: "c/:id",
              element: (
                <ChatAccessGuard>
                  <ChatRoomPage />
                </ChatAccessGuard>
              ),
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

export default router;
