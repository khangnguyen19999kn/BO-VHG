import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected-route/_auth/_layout/blogs/edit/$id')({
  component: () => <div>Hello /_protected-route/_auth/_layout/blogs/edit/$id!</div>
})