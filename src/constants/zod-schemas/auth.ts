import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z.string({
    required_error: 'Email is required. Please enter your access email.',
  }).email({
    message: 'Invalid email format. Please enter a valid email address.',
  }),
  password: z.string({
    required_error: 'Password is required.',
  })
});