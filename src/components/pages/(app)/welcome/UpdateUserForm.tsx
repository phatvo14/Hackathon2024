import { TStepOneForm, TStepTwoForm } from "@/components/pages/(app)/welcome";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multi-selector";
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
      return <FormStepTwo form={form} />;
    case 3:
      return <FormStepThree form={form} />;
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

const FormStepTwo = ({
  form,
}: {
  form: UseFormReturn<TStepTwoForm, any, undefined>;
}) => {
  const options: Option[] = [
    { label: "ReactJS", value: "ReactJS" },
    { label: "AI", value: "AI" },
    { label: "Python", value: "Python" },
    { label: "Automation Test", value: "Automation Test" },
    { label: "Soft Skills", value: "Soft Skills" },
  ];
  return (
    <div className="flex flex-col w-full mt-6">
      <Form {...form}>
        <form onSubmit={() => {}} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 font-normal">
                  Personal skills
                </FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    placeholder="Select you options ..."
                    defaultOptions={options}
                    badgeClassName="bg-my-blue hover:bg-my-blue/90"
                    emptyIndicator={
                      <p className="text-center text-xs leading-10 text-gray-600 dark:text-gray-400">
                        No results found.
                      </p>
                    }
                  />
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

const FormStepThree = ({
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
