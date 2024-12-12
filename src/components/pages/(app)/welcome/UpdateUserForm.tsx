import { TStepOneForm } from "@/components/pages/(app)/welcome";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentUserStore } from "@/stores";
import { UseFormReturn } from "react-hook-form";

export const UpdateUserForm = ({ step, form }: { step: number; form: any }) => {
  switch (step) {
    case 1:
      return <FormStepOne form={form} />;
    case 2:
      return;
    case 3:
      return;
  }
};

const FormStepOne = ({
  form,
}: {
  form: UseFormReturn<TStepOneForm, any, undefined>;
}) => {
  const { currentUser } = useCurrentUserStore();

  return (
    <div className="flex flex-col w-full mt-6">
      <Form {...form}>
        <form onSubmit={() => {}} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <h2 className="text-zinc-500 text-sm">
                  Dear{" "}
                  <span className="text-my-blue font-semibold">
                    {currentUser?.fullName}
                  </span>
                  , which role are you?
                </h2>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mentor">Mentor</SelectItem>
                      <SelectItem value="mentee">Mentee</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 font-normal">
                  Employee Code
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 123456" {...field} />
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
