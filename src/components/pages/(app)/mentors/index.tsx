import { MentorFilter } from "@/components/pages/(app)/mentors/MentorFilter";
import { MentorsList } from "@/components/pages/(app)/mentors/MentorsList";
import { Separator } from "@/components/ui/separator";
import { useCurrentUserStore } from "@/stores";
import mentors from "@/data/mentors.json";
import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { TUserInfo } from "../welcome";
import { matchingService } from "@/services";

export const MentorsPage = () => {
  const { currentUser } = useCurrentUserStore();
  const [params] = useSearchParams();
  const [mentorsMatching, setMentorsMatching] = useState<any[]>([]);
  const isMatching = params.get("isMatching");

  useEffect(() => {
    const getMatchingResults = async (user: TUserInfo) => {
      try {
        const res = await matchingService.getMatchingResults(user);
        if(res.data) {
          setMentorsMatching(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if(isMatching && currentUser) {
      getMatchingResults(currentUser as TUserInfo);
    }
  }, [currentUser, isMatching]);

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }
  
  return (
    <div className="bg-[#e4dbd3] w-full min-h-[calc(100vh-3rem)] p-6 flex flex-col">
      <MentorFilter isMatching={isMatching || ''} currentUser={currentUser}/>
      <Separator className="bg-zinc-500 my-4" />
      <MentorsList data={isMatching ? mentorsMatching : mentors} />
    </div>
  );
};
