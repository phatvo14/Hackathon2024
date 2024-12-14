import { cn } from "@/lib/utils";
import { useCurrentUserStore } from "@/stores";
import { useRef } from "react";

export const MessageList = ({ data }: { data: any[] }) => {
  const { currentUser } = useCurrentUserStore();

  const botttomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    botttomRef.current?.scrollIntoView({ behavior: "instant" });
  };

  return (
    <div className="h-[calc(100vh-12.5rem)]">
      <div className="h-full flex flex-col gap-1.5 items-end overflow-auto">
        {data.map((item, index) => {
          return item.sender == currentUser?._id ? (
            <MessageRightBubble message={item} key={index} />
          ) : (
            <MessageLeftBubble message={item} />
          );
        })}
      </div>
    </div>
  );
};

export const MessageRightBubble = ({ message }: { message: any }) => (
  <div className={cn("flex gap-2 items-center")}>
    <p
      className={cn(
        "bg-my-blue/50 text-sm text-white py-1 px-3 rounded-lg rounded-br-none transition-all"
      )}
    >
      {message.content}
    </p>
  </div>
);

export const MessageLeftBubble = ({ message }: { message: any }) => (
  <div className={cn("flex gap-2 items-center justify-start w-full")}>
    <p
      className={cn(
        "bg-gray-200/80 text-sm dark:bg-accent py-1 px-3 rounded-lg rounded-tl-none transition-all"
      )}
    >
      {message.content}
    </p>
  </div>
);
