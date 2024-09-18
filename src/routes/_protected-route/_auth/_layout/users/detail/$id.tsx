import UpdateUserPage from '@/features/users/update-user'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected-route/_auth/_layout/users/detail/$id')({
  component: () => <UpdateUserPage/>
})