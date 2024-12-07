import { MainHeader } from "@/components/layouts";
import { NotFound } from "@/components/pages/404";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <>
      <MainHeader />
      <main className="mt-12 min-h-[calc(100vh-3rem)] h-[calc(100vh-3rem)]">
        <Outlet />
      </main>
    </>
  );
}
