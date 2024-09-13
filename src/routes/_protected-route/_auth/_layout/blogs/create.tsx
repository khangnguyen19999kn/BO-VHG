import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected-route/_auth/_layout/blogs/create')({
  component: () => <div>Hello /_protected-route/_auth/_layout/blogs/create!</div>
})