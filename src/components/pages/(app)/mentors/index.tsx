import { MentorFilter } from "@/components/pages/(app)/mentors/MentorFilter";
import { MentorsList } from "@/components/pages/(app)/mentors/MentorsList";
import { Separator } from "@/components/ui/separator";
import mentors from "@/data/mentors.json";
import { useCurrentUserStore } from "@/stores";
import { Navigate } from "react-router-dom";

export const MentorsPage = () => {
  const { currentUser } = useCurrentUserStore();
  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="bg-[#e4dbd3] w-full min-h-[calc(100vh-3rem)] p-6 flex flex-col">
      <MentorFilter />
      <Separator className="bg-zinc-500 my-4" />
      <MentorsList data={mentors} />
    </div>
  );
};
