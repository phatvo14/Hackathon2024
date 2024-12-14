import { SVGIcon } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { User } from "@/stores";
import { useNavigate } from "react-router-dom";

type MentorFilterProps = {
  isMatching: string;
  currentUser: User;
};

export const MentorFilter = ({ isMatching, currentUser }: MentorFilterProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">
            {isMatching === 'true'
              ? "Mentors based on your profile"
              : "Let's find your mentor"}
          </h1>
          {!isMatching && (
            <Button className="border border-zinc-900 flex gap-1" onClick={() => navigate('/mentors?isMatching=true')}>
              <SVGIcon
                path={SVGIcon.paths.cards}
                className="stroke-2 fill-white"
              />
              <span className="text-xs font-semibold">Match mentor card</span>
            </Button>
          )}
        </div>
        <span className="text-sm text-zinc-500">
          Start a conversation with a mentor who is available to talk right now
        </span>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {currentUser.skills.split(', ').map((item: string, index: number) => (
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
