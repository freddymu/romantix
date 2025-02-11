import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const superAdminOnly: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user?.collection === 'admins' && user.role === 'super-admin')
}
