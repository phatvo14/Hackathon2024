import { useParams } from "react-router-dom";
import mentors from "@/data/mentors.json";
import img from "@/assets/avt.jpg";
import { ChartNoAxesCombinedIcon, ClockIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { Button } from "@/components/ui/button";
import { SVGIcon } from "@/components/ui";
import { Separator } from "@/components/ui/separator";

export const MentorDetailPage = () => {
  const { id } = useParams();
  const mentor = mentors.find((item) => item.id == id);

  if (!mentor) {
    return <></>;
  }

  return (
    <div className="p-6 h-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-10 items-start">
          <img src={img} className="w-40 aspect-square rounded-lg" />
          <div className="flex flex-col gap-2 justify-between h-full">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl uppercase font-bold text-my-blue">
                {mentor?.fullName}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <ClockIcon className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Availability:{" "}
                  <span className="text-zinc-500 ml-6">
                    {mentor?.Availability}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ChartNoAxesCombinedIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Good at:</span>
                <div className="ml-10 flex flex-wrap gap-2 items-center">
                  {mentor.skills
                    .slice(0, 4)
                    .map((item: string, index: number) => (
                      <SkillItem title={item} key={index} />
                    ))}
                  {mentor.skills.length > 4 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="bg-[#beb4ab] px-2.5 py-1 text-nowrap rounded text-xs cursor-pointer">
                            +{mentor.skills.length - 4} more
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="mb-1 bg-zinc-800 text-white text-xs text-center">
                          <p>
                            {mentor.skills
                              .slice(4)
                              .map((title: string, index: number) => (
                                <React.Fragment key={index}>
                                  <span>{title}</span>
                                  <br />
                                </React.Fragment>
                              ))}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
            <Button className="border border-zinc-900 flex gap-2 w-40">
              <SVGIcon
                path={SVGIcon.paths.paperPlaneTilt}
                className="stroke-2 fill-white"
              />
              <span className="text-xs font-semibold">Send request</span>
            </Button>
          </div>
        </div>
      </div>
      <Separator className="bg-zinc-500" />
      <div className="flex gap-2"></div>
    </div>
  );
};

const SkillItem = ({ title }: { title: string }) => {
  return (
    <div className="bg-[#beb4ab] px-2.5 py-1 text-nowrap rounded text-xs cursor-pointer hover:-translate-y-0.5 transition-all">
      {title}
    </div>
  );
};
