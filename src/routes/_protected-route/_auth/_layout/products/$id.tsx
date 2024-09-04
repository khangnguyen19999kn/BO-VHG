import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected-route/_auth/_layout/products/$id')({
  component: () => <div>Hello /_protected-route/_auth/_layout/products/$id!</div>
})