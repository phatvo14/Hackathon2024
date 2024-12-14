import { TUserInfo } from "@/components/pages";
import api from "@/configs/axios";

class MatchingService {
  getMatchingResults = async (userInfo: TUserInfo) => {
    return await api.post("matching", {
      ...userInfo,
      employeeID: userInfo.employeeNumber,
    });
  };
}

export const matchingService = new MatchingService();
