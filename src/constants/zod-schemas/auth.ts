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

export const signUpFormSchema = z.object({
  fullName: z.string({
    required_error: 'Full name is required. Please enter your Full name.',
  }).min(2,{
    message: 'Full name must have at least 2 characters',
  }).max(50, {
    message: 'Full name can have at most 50 characters',
  }),
  email: z.string({
    required_error: 'Email is required. Please enter your access email.',
  }).email({
    message: 'Invalid email format. Please enter a valid email address.',
  }),
  password: z.string({
    required_error: 'Password is required.',
  })
});