import image from "@/assets/avt.jpg";
import { TEmployeeData } from "@/components/pages/(app)/chat";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useGetPathName } from "@/hooks";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const UserCard = ({ data }: { data: TEmployeeData }) => {
  const pathName = useGetPathName();

  return (
    <Link to={`/chat/${data.employeeID}`}>
      <div
        className={cn(
          "flex gap-2 items-center px-4 py-2 rounded-lg w-full",
          pathName == `/chat/${data.employeeID}`
            ? "bg-my-blue/20 hover:bg-my-blue/20"
            : "hover:bg-zinc-600/10"
        )}
      >
        <Avatar className="border-2 h-12 w-12">
          <AvatarImage src={image} alt="User Avatar" />
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-sm font-bold">{data.name}</h3>
          <span className="text-xs text-zinc-500 line-clamp-1">
            {data.department}
          </span>
        </div>
      </div>
    </Link>
  );
};
