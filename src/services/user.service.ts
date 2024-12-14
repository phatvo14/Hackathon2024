import api from "@/configs/axios";
import { TGetUserListDTO } from "@/hooks/queries";

class UserService {
  currentUser = async () => {
    return await api.get("user/current");
  };
  getAllUsers = async (filter: TGetUserListDTO) => {
    return await api.get("user", {
      params: filter,
    });
  };
  getUserInfo = async (id: string) => {
    return await api.get(`user/${id}`);
  };
}

export const userService = new UserService();
