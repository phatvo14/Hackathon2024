import { SVGIcon } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import image from "@/assets/avt.jpg";

export const MentorsList = ({ data }: { data: any[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {data.map((item, index) => (
        <MentorItem key={index} info={item} />
      ))}
    </div>
  );
};

const MentorItem = ({ info }: { info: any }) => {
  return (
    <div className="bg-white rounded-lg hover:shadow-lg p-6 pt-56 flex flex-col gap-2 overflow-hidden relative">
      <img
        src={image}
        className="absolute top-0 inset-x-0 h-52 w-full object-cover rounded-b-lg"
      />
      <h3 className="font-semibold text-lg">{info.fullName}</h3>
      <Separator className="mb-1" />
      <div className="flex flex-wrap gap-2 items-center">
        {info.skills.slice(0, 2).map((item: string, index: number) => (
          <SkillItem title={item} key={index} />
        ))}
        {info.skills.length > 2 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-[#beb4ab] px-2.5 py-1 text-nowrap rounded text-sm cursor-pointer">
                  +{info.skills.length - 2} more
                </div>
              </TooltipTrigger>
              <TooltipContent className="mb-1 bg-zinc-800 text-white text-xs text-center">
                <p>
                  {info.skills.slice(2).map((title: string, index: number) => (
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
      <Button className="border border-zinc-900 hover:bg-[#ffe733]/90 flex gap-2 w-32 mt-auto">
        <SVGIcon path={SVGIcon.paths.paperPlaneTilt} className="stroke-2" />
        <span className="text-xs font-semibold">Send request</span>
      </Button>
    </div>
  );
};

const SkillItem = ({ title }: { title: string }) => {
  return (
    <div className="bg-[#beb4ab] px-2.5 py-1 text-nowrap rounded text-sm cursor-pointer hover:-translate-y-0.5 transition-all">
      {title}
    </div>
  );
};
