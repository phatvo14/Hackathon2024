import { MentorFilter } from "@/components/pages/(app)/mentors/MentorFilter";
import { MentorsList } from "@/components/pages/(app)/mentors/MentorsList";
import {
  Sidebar,
  TMentorFilter,
} from "@/components/pages/(app)/mentors/Sidebar";
import { Separator } from "@/components/ui/separator";
import mentors from "@/data/mentors.json";
import { matchingService } from "@/services";
import { useCurrentUserStore } from "@/stores";
import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { TUserInfo } from "../welcome";
import { useDebounce } from "@/components/ui/multi-selector";

export const MentorsPage = () => {
  const { currentUser } = useCurrentUserStore();
  const [params] = useSearchParams();

  const [mentorsMatching, setMentorsMatching] = useState<any[]>([]);
  const [filterParams, setfilterParams] = useState<TMentorFilter>({});
  const [data, setData] = useState(mentors.slice(0, 15));

  const debounceParams = useDebounce(filterParams);
  const isMatching = params.get("isMatching");

  useEffect(() => {
    const getMatchingResults = async (user: TUserInfo) => {
      try {
        const res = await matchingService.getMatchingResults(user);
        if (res.data) {
          setMentorsMatching(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (isMatching && currentUser) {
      getMatchingResults(currentUser as TUserInfo);
    }
  }, [currentUser, isMatching]);

  useEffect(() => {
    if (debounceParams)
      setData(() => {
        return mentors
          .filter(
            (item) =>
              (debounceParams.searchText
                ? item.name
                    .toLowerCase()
                    .includes(debounceParams.searchText.toLowerCase())
                : true) &&
              (debounceParams.skill
                ? item.skills.some((item) => item == debounceParams.skill)
                : true)
          )
          .slice(0, 15);
      });
  }, [debounceParams]);

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="flex bg-[#e4dbd3] w-full min-h-[calc(100vh-3rem)] relative">
      <Sidebar
        params={filterParams}
        handleFilterChange={(value) => {
          setfilterParams((prev) => {
            return { ...prev, ...value };
          });
        }}
      />
      <div className="flex flex-col h-full flex-auto">
        <MentorFilter isMatching={isMatching || ""} currentUser={currentUser} />
        <Separator className="bg-zinc-500 my-2" />
        <MentorsList data={isMatching ? mentorsMatching : data} />
      </div>
    </div>
  );
};
