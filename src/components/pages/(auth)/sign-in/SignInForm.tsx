import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/constants/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export type TSignInForm = {
  username?: string;
  password?: string;
};

export const SignInForm = () => {
  const form = useForm<TSignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {},
  });

  function onSubmit(values: TSignInForm) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Username</FormLabel>
              <FormControl>
                <Input
                  size={10}
                  placeholder="Type access username"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-normal" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Password</FormLabel>
              <FormControl>
                <Input
                  size={10}
                  type="password"
                  placeholder="Enter a password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-normal" />
            </FormItem>
          )}
        />
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            className="text-xs w-full mx-auto font-semibold"
          >
            Log in
          </Button>
        </div>
      </form>
    </Form>
  );
};
