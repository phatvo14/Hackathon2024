import { MentorFilter } from "@/components/pages/(app)/mentors/MentorFilter";
import { MentorsList } from "@/components/pages/(app)/mentors/MentorsList";
import {
  Sidebar,
  TMentorFilter,
} from "@/components/pages/(app)/mentors/Sidebar";
import { useDebounce } from "@/components/ui/multi-selector";
import { Separator } from "@/components/ui/separator";
import mentors from "@/data/mentors.json";
import { matchingService, userService } from "@/services";
import { useCurrentUserStore } from "@/stores";
import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import "./style.css";

export const MentorsPage = () => {
  const { currentUser } = useCurrentUserStore();
  const [params] = useSearchParams();

  const [mentorsMatching, setMentorsMatching] = useState<any[]>([]);
  const [filterParams, setfilterParams] = useState<TMentorFilter>({});
  const [data, setData] = useState(mentors.slice(0, 15));
  const debounceParams = useDebounce(filterParams);
  const isMatching = params.get("isMatching");
  const [isLoading, setIsLoading] = useState(false);
  const [showLightEffect, setShowLightEffect] = useState(false);

  useEffect(() => {
    const getMatchingResults = async () => {
      const user = await userService.getUserInfo(currentUser?._id || "");
      if (!user) return;
      try {
        console.log('User data: ', user.data.data)
        setIsLoading(true);
        setShowLightEffect(true);
        setTimeout(async () => {
          const res = await matchingService.getMatchingResults(user.data.data);
          if (res.data) {
            const mentorsArr = res.data.data.reduce((acc, item) => {
              const mentor = mentors.find(
                (mentor) => mentor.mentorID === item.mentorID
              );
              if (mentor) {
                acc.push({
                  ...mentor,
                  avatar: mentor.avatar || "",
                  matchingPercent: item.TunedSuccessProbability,
                });
              }
              return acc;
            }, []);

            setMentorsMatching(mentorsArr);
          }
          setIsLoading(false);
          setShowLightEffect(false);
        }, 2000);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setShowLightEffect(false);
      }
    };
    if (isMatching && currentUser) {
      setIsLoading(true);
      getMatchingResults();
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
        {isLoading && showLightEffect && (
          <div className="modal">
            <div className="modal-content">
              <div className="light-effect">
                <img
                  src="https://res.cloudinary.com/dblglqzca/image/upload/v1734195121/tintor-images/pngwing.com_1_zdsxfn.png"
                  alt="Loading bulb"
                  className="bulb-image"
                />
                <audio controls autoPlay className="audio-player hidden">
                  <source
                    src="https://res.cloudinary.com/dblglqzca/video/upload/v1734229386/tintor-images/doorbell-shortened-100308_dd3d0r.mp3"
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        )}
        <MentorsList
          data={isMatching ? (isLoading ? [] : mentorsMatching) : mentors}
          isMatching={isMatching || ""}
        />
      </div>
    </div>
  );
};
