import { MainHeader } from "@/components/layouts/Header";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <>
      <MainHeader />
      <main className="mt-12 min-h-[calc(100vh-3rem)] h-[calc(100vh-3rem)]">
        <Outlet />
      </main>
    </>
  );
};
