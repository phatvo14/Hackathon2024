import { MainHeader } from "@/components/layouts";
import { NotFound } from "@/components/pages/404";
import { userService } from "@/services";
import { useCurrentUserStore, User } from "@/stores";
import { createRootRoute, Outlet, useLoaderData } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
  loader: async () => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) return null;
    try {
      const { data } = await userService.currentUser();
      return { currentUser: data.data };
    } catch (error) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return null;
    }
  },
});

function RootComponent() {
  const data = useLoaderData({ from: "__root__" });
  const { signIn } = useCurrentUserStore();

  useEffect(() => {
    if (data) signIn(data.currentUser as User);
  }, [data]);
  return (
    <>
      <MainHeader />
      <main className="mt-12 min-h-[calc(100vh-3rem)] h-[calc(100vh-3rem)]">
        <Outlet />
      </main>
    </>
  );
}
