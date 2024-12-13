import image from "@/assets/avt.jpg";
import { SVGIcon } from "@/components/ui";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import employees from "@/data/employees.json";
import { useToggle } from "@/hooks/customs";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SmileIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

export const ChatInfoPage = () => {
  const { id } = useParams();
  const info = employees.find((item) => item.employeeID == id);

  const [messages, setMessages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  if (!info) {
    return <></>;
  }

  return (
    <div className="px-6 h-full flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-start">
            <Avatar className="border-2 h-12 w-12">
              <AvatarImage src={image} alt="User Avatar" />
            </Avatar>
            <div className="flex flex-col gap-2 justify-between h-full">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{info.name}</h3>
                <span className="text-xs text-zinc-500 line-clamp-1">
                  {info.department}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"} className="text-xs">
                  Leave conversation
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setIsOpen(false);
                      setIsOpenDialog(true);
                    }}
                  >
                    Continue
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Dialog
              open={isOpenDialog}
              onOpenChange={(open) => {
                if (!open) return;
                setIsOpenDialog(open);
              }}
            >
              <DialogContent
                className="w-1/2"
                onClick={(e) => e.stopPropagation()}
              >
                <DialogFooter className="items-center gap-2">
                  <span
                    onClick={() => setIsOpenDialog(false)}
                    className="text-sm text-zinc-500 underline underline-offset-2 p-1 cursor-pointer"
                  >
                    Skip
                  </span>
                  <Button type="submit" onClick={() => setIsOpenDialog(false)}>
                    Send
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Separator className="bg-zinc-500" />
      <div className="flex flex-col gap-2 flex-auto">
        <MessageList data={messages} />
        <MessageInput
          sendMessage={(message) => setMessages((prev) => [...prev, message])}
        />
      </div>
    </div>
  );
};

export const MessageList = ({ data }: { data: string[] }) => {
  return (
    <div className="h-[calc(100vh-12.5rem)]">
      <div className="h-full flex flex-col gap-1 items-end overflow-auto">
        {data.map((item, index) => (
          <span
            className="w-fit px-3 py-1 bg-my-blue text-sm text-white rounded-lg rounded-br-none"
            key={index}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export const MessageInput = ({
  sendMessage,
}: {
  sendMessage: (message: string) => void;
}) => {
  const schema = z.object({
    message: z.string().min(1),
  });

  const form = useForm<{ message: string }>({
    resolver: zodResolver(schema),
    defaultValues: { message: "" },
  });

  const currentMessage = form.watch("message");

  return (
    <div className="relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            form.resetField("message");
            sendMessage(values.message);
          })}
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Type message..."
                    className="h-10 pr-20 text-xs placeholder:text-xs border-2 border-zinc-500 focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 h-7 flex items-center">
        <div className="h-1/2 w-[1.5px] bg-zinc-500 mr-2"></div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                type="button"
                variant={"ghost"}
                className="p-1.5 rounded-full"
              >
                <SmileIcon className="text-zinc-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-800 text-white text-xs text-center">
              <p>Emoji</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                type="submit"
                variant={"ghost"}
                className="p-1.5 rounded-full"
              >
                <SVGIcon
                  className={cn(
                    (currentMessage || "").length > 0
                      ? "fill-my-blue"
                      : "fill-zinc-500",
                    "stroke-2"
                  )}
                  path={
                    (currentMessage || "").length > 0
                      ? SVGIcon.paths.paperFill
                      : SVGIcon.paths.paperPlaneTilt
                  }
                  width={16}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-800 text-white text-xs text-center">
              <p>Send message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
