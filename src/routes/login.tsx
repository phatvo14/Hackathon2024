import { SignInPage } from '@/components/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: SignInPage,
})
