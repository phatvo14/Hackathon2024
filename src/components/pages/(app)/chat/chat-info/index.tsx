import image from "@/assets/avt.jpg";
import { MessageInput } from "@/components/pages/(app)/chat/chat-info/MessageInput";
import { MessageList } from "@/components/pages/(app)/chat/chat-info/MessageList";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import employees from "@/data/employees.json";
import { useState } from "react";
import { useParams } from "react-router-dom";

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
