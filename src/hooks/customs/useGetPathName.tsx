import { useRouter } from "@tanstack/react-router";

export const useGetPathName = () => {
  const router = useRouter();
  return router.state.location.pathname;
};
