import { defineRouterConfig } from '@ali/ppx'

export default defineRouterConfig([
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
])
