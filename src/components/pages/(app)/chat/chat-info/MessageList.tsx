export const MessageList = ({ data }: { data: string[] }) => {
  return (
    <div className="h-[calc(100vh-12.5rem)]">
      <div className="h-full flex flex-col gap-1 items-end overflow-auto">
        {data.map((item, index) => (
          <span
            className="w-fit px-3 py-1.5 bg-my-blue text-sm text-white rounded-lg rounded-br-none"
            key={index}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
