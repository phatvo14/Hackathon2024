import { MentorFilter } from "@/components/pages/(app)/mentors/MentorFilter";
import { MentorsList } from "@/components/pages/(app)/mentors/MentorsList";
import { Separator } from "@/components/ui/separator";
import mentors from "@/data/mentors.json";

export const MentorsPage = () => {
  return (
    <div className="bg-[#e4dbd3] w-full min-h-[calc(100vh-3rem)] p-6 flex flex-col">
      <MentorFilter />
      <Separator className="bg-zinc-500 my-4" />
      <MentorsList data={mentors} />
    </div>
  );
};
