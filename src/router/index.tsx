import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import Loader from "@/components/ui/Loader";

const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const ChatLayout = lazy(() => import("@/layouts/ChatLayout"));

const HomePage = lazy(() => import("@/pages/HomePage"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));
const ChatRoomPage = lazy(() => import("@/pages/ChatRoomPage"));
const ArchivePage = lazy(() => import("@/pages/ArchivePage"));
const AuthPage = lazy(() => import("@/pages/Auth/AuthPage"));
const CreatePasswordPage = lazy(
  () => import("@/pages/Auth/CreatePasswordPage")
);
const ForgotPasswordPage = lazy(
  () => import("@/pages/Auth/ForgotPasswordPage")
);

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      element: (
        <Suspense fallback={<Loader />}>
          <AuthLayout />
        </Suspense>
      ),
      children: [
        {
          path: "login",
          element: (
            <Suspense fallback={<Loader />}>
              <AuthPage />
            </Suspense>
          ),
        },
        {
          path: "sign-up",
          element: (
            <Suspense fallback={<Loader />}>
              <AuthPage />
            </Suspense>
          ),
        },
        {
          path: "create-password",
          element: (
            <Suspense fallback={<Loader />}>
              <CreatePasswordPage />
            </Suspense>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <Suspense fallback={<Loader />}>
              <ForgotPasswordPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      element: (
        <Suspense fallback={<Loader />}>
          <ChatLayout />
        </Suspense>
      ),
      children: [
        {
          path: "c",
          element: (
            <Suspense fallback={<Loader />}>
              <ChatPage />
            </Suspense>
          ),
        },
        {
          path: "archive",
          element: (
            <Suspense fallback={<Loader />}>
              <ArchivePage />
            </Suspense>
          ),
        },
        {
          path: "c/:id",
          element: (
            <Suspense fallback={<Loader />}>
              <ChatRoomPage />
            </Suspense>
          ),
        },
      ],
    },
  ],

  {
    future: {
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
