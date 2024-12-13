import { UserCard } from "@/components/pages/(app)/chat/UserCard";
import { UserFilter } from "@/components/pages/(app)/chat/UserFilter";
import { useDebounce } from "@/components/ui/multi-selector";
import data from "@/data/employees.json";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

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
  const [searchText, setSearchText] = useState<string>("");
  const [users, setUsers] = useState<TEmployeeData[]>(data.slice(0, 10));

  const handleFilter = (params: string) => {
    setUsers(() =>
      data
        .filter((item) =>
          item.name.toLowerCase().includes(params.toLowerCase())
        )
        .slice(0, 10)
    );
  };

  const currSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    handleFilter(currSearchText);
  }, [currSearchText]);

  return (
    <div className="bg-[#e4dbd3] w-full h-[calc(100vh-3rem)] flex p-6 pb-4">
      <div className="h-full border-zinc-500 border-r-2 pl-2 min-w-80">
        <div className="flex flex-col gap-1 h-full pr-4 overflow-auto relative">
          <UserFilter setSearchText={setSearchText} />
          <>
            {users.length > 0 ? (
              users.map((item) => (
                <UserCard key={item.employeeID} data={item} />
              ))
            ) : (
              <h4 className="w-full text-center text-sm font-medium">
                No results.
              </h4>
            )}
          </>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
