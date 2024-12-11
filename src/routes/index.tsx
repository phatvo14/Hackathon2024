import { AppLayout } from "@/components/layouts/AppLayout";
import { SignInPage, SignUpPage } from "@/components/pages";
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
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
