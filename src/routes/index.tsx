import { AppLayout } from "@/components/layouts/AppLayout";
import {
  MentorsPage,
  SignInPage,
  SignUpPage,
  WelcomePage,
} from "@/components/pages";
import { ChatPage } from "@/components/pages/(app)/chat";
import { NotFound } from "@/components/pages/404";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "chat",
        element: <ChatPage />,
        children: [
          {
            path: ":id",
          },
        ],
      },
      {
        path: "mentors",
        element: <MentorsPage />,
        children: [
          {
            path: ":id",
          },
        ],
      },
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "welcome",
        element: <WelcomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
