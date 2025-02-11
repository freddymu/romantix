import type { CollectionConfig } from 'payload'

import { superAdminOnly } from '../access/superAdminOnly'

export const Admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    useAsTitle: 'email',
    group: 'Internal',
  },
  auth: true,
  access: {
    read: superAdminOnly,
    create: superAdminOnly,
    update: superAdminOnly,
    delete: superAdminOnly,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Content Manager', value: 'content-manager' },
      ],
      defaultValue: 'content-manager',
    },
  ],
}
