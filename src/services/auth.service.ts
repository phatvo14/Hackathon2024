import { TSignInForm } from "@/components/pages/(auth)/sign-in/SignInForm";
import api from "@/configs/axios";

class AuthService {
  signIn = (form: TSignInForm) => {
      return api.post('auth/login', form);
  }
}

export const authService = new AuthService();