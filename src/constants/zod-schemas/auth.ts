import { z } from 'zod'

export const signInFormSchema = z.object({
  username: z.string({
    required_error: 'Username is required. Please enter your username.',
  }),
  password: z.string({
    required_error: 'Password is required.',
  })
});