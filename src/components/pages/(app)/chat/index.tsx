import { UserCard } from "@/components/pages/(app)/chat/UserCard";
import { UserFilter } from "@/components/pages/(app)/chat/UserFilter";
import { useDebounce } from "@/components/ui/multi-selector";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUsers } from "@/hooks/queries";
import { useCurrentUserStore } from "@/stores";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export type TEmployeeData = {
  employeeID: string;
  name: string;
  skills: string[];
  experience: number;
  department: string;
  learningGoal: string;
  availability: string;
  email: string;
  interest: string;
  phoneNumber: string;
};

export const ChatPage = () => {
  const { currentUser } = useCurrentUserStore();

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  return <PageContent />;
};

const PageContent = () => {
  const [searchText, setSearchText] = useState<string>("");
  const debounceText = useDebounce(searchText, 500);

  const { users, isFetchingUsers } = useGetUsers({
    isActive: true,
    searchText: debounceText,
  });

  return (
    <div className="bg-[#e4dbd3] w-full h-[calc(100vh-3rem)] flex p-6 pb-4">
      <div className="h-full border-zinc-500 border-r-2 pl-2 min-w-80">
        <div className="flex flex-col gap-1 h-full pr-4 overflow-auto relative">
          <UserFilter setSearchText={setSearchText} text={searchText} />
          {isFetchingUsers ? (
            <>
              <UserSkeleton />
              <UserSkeleton />
              <UserSkeleton />
            </>
          ) : (
            <>
              {(users || []).length > 0 ? (
                users.map((item: any) => (
                  <UserCard key={item._id} data={item} />
                ))
              ) : (
                <h4 className="w-full text-center text-sm font-medium">
                  No results.
                </h4>
              )}
            </>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

const UserSkeleton = () => (
  <div className="flex gap-2 items-center mb-3">
    <Skeleton className="rounded-full w-12 h-12 bg-zinc-500/20" />
    <div className="flex flex-col gap-2">
      <Skeleton className="rounded-full w-56 h-5 bg-zinc-500/20" />
      <Skeleton className="rounded-full w-24 h-4 bg-zinc-500/20" />
    </div>
  </div>
);
