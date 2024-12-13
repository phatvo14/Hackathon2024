import bgImg from "@/assets/welcome-bg.jpg";
import { UpdateUserForm } from "@/components/pages/(app)/welcome/UpdateUserForm";
import { Button } from "@/components/ui/button";
import { Option } from "@/components/ui/multi-selector";
import { Separator } from "@/components/ui/separator";
import {
  welcomeStepOneFormSchema,
  welcomeStepTwoFormSchema,
} from "@/constants/zod-schemas";
import { cn } from "@/lib/utils";
import { useCurrentUserStore } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export type TStepOneForm = {
  role?: string;
  employeeNumber?: string;
};

export type TStepTwoForm = {
  skills?: Option[];
};

export const WelcomePage = () => {
  const { currentUser } = useCurrentUserStore();

  const [step, setStep] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<any>({});

  const stepOneForm = useForm<TStepOneForm>({
    resolver: zodResolver(welcomeStepOneFormSchema),
    defaultValues: {},
  });

  const stepTwoForm = useForm<TStepTwoForm>({
    resolver: zodResolver(welcomeStepTwoFormSchema),
    defaultValues: {},
  });

  const currentForm = useMemo(() => {
    switch (step) {
      case 1:
        return stepOneForm;
      case 2:
        return stepTwoForm;
    }
    return stepOneForm as any;
  }, [step]);

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="bg-[#e4dbd3] w-full h-full p-6 flex items-center">
      <div className="grid grid-cols-2 -space-x-2 mx-auto w-[60rem] h-[75vh] shadow-lg rounded-lg overflow-hidden">
        <img src={bgImg} className="object-cover h-full" />
        <div className="flex flex-col items-center mx-auto py-6 px-8 bg-white rounded-lg">
          <h1 className="font-bold text-xl mb-2">Welcome CLT's Member</h1>
          <h2 className="text-sm text-zinc-500 text-center">
            Join the Tinter Community — Where Mentorship Meets Opportunity!
          </h2>
          <Separator className="my-4 bg-zinc-500 w-1/2" />
          <UpdateUserForm step={step} form={currentForm} />
          <div className="flex justify-between mt-auto items-center w-full">
            <div className="flex flex-col gap-0.5 items-center">
              <span className="font-medium text-xs">Step {step} of 3</span>
              <div className="flex gap-1 items-center">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    className={cn(
                      step >= index + 1 ? "bg-green-500" : "bg-transparent",
                      "w-6 h-[5px] border-[1px] border-black"
                    )}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {step > 1 && (
                <Button
                  variant={"outline"}
                  className="h-8"
                  onClick={() => step > 1 && setStep((prev) => prev - 1)}
                >
                  <span className="text-xs">Back</span>
                </Button>
              )}
              <Button
                className="gap-0"
                onClick={() => {
                  switch (step) {
                    case 1:
                      currentForm.handleSubmit((values: TStepOneForm) => {
                        setUserInfo((prev: any) => {
                          return { ...prev, ...values };
                        });
                        setStep((prev) => prev + 1);
                      })();
                      break;
                    case 2:
                      debugger;
                      currentForm.handleSubmit((values: TStepTwoForm) => {
                        setUserInfo((prev: any) => {
                          return {
                            ...prev,
                            skills: (values.skills || []).map(
                              (item) => item.value
                            ),
                          };
                        });
                        setStep((prev) => prev + 1);
                      })();
                      break;
                    case 3:
                  }
                }}
              >
                <span className="text-xs">Next</span>
                <ChevronRight className="translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
