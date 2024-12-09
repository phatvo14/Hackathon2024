import { userService } from "@/services";
import { useCurrentUserStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  const { signIn } = useCurrentUserStore();

  const { data, isFetching } = useQuery({
    queryKey: ["GET_CURRENT_USER"],
    queryFn: async () => {
      const { data } = await userService.currentUser();
      signIn(data.data);
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  return { currentUserData: data, isFetchingCurrentUserData: isFetching };
};
