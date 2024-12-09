import api from "@/configs/axios";

class UserService {
  currentUser = async () => {
    return await api.get("user/current");
  };
}

export const userService = new UserService();
