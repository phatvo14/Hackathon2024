import { SVGIcon } from "@/components/ui";
import { Button } from "@/components/ui/button";

const skills = ["ReactJS", "Python", "AI", "Automation Test"];

export const MentorFilter = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Let's find your mentor</h1>
          <Button className="border border-zinc-900 hover:bg-[#ffe733]/90 flex gap-1">
            <SVGIcon path={SVGIcon.paths.cards} className="stroke-2" />
            <span className="text-xs font-semibold">Match mentor card</span>
          </Button>
        </div>
        <span className="text-sm text-zinc-500">
          Start a conversation with a mentor who is available to talk right now
        </span>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {skills.map((item, index) => (
          <SkillItem key={index} title={item} />
        ))}
      </div>
    </div>
  );
};

const SkillItem = ({ title }: { title: string }) => {
  return (
    <div className="bg-[#beb4ab] px-2.5 py-1 rounded text-sm cursor-pointer hover:-translate-y-0.5 transition-all">
      {title}
    </div>
  );
};
