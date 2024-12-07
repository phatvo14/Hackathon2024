import { TSignInForm } from "@/components/pages/(auth)/sign-in/SignInForm";
import { authService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import Cookies from 'js-cookie';

export const useSignIn = () => {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
      mutationFn: async (form: TSignInForm) => {
          const { data } = await authService.signIn(form)
          Cookies.set('accessToken', data.token)
      },
      onSuccess: () => {
         router.navigate({to: '/'});
      },
  })

  return {
      mutateSignIn: mutateAsync,
      isPendingSignIn: isPending,
  }
}
