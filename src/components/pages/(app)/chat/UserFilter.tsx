import { Input } from "@/components/ui/input";

export const UserFilter = (props: {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex items-center gap-2 top-0 sticky bg-[#e4dbd3] z-[10] pb-2">
      <Input
        placeholder="Search user's name..."
        className="h-9 border-2 border-zinc-500 focus-visible:ring-0"
        onChange={(e) => props.setSearchText(e.target.value)}
      />
    </div>
  );
};
