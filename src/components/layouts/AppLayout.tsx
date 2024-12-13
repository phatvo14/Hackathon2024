import { MainHeader } from "@/components/layouts/Header";
import { hideHeaderRoutes } from "@/constants";
import { useGetPathName } from "@/hooks";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  const pathName = useGetPathName();

  return (
    <>
      {!hideHeaderRoutes.includes(pathName) && <MainHeader />}
      <main
        className={cn(
          !hideHeaderRoutes.includes(pathName)
            ? "mt-[3rem] min-h-[calc(100vh-3rem)] h-[calc(100vh-3rem)]"
            : "h-[100vh]"
        )}
      >
        <Outlet />
      </main>
    </>
  );
};
