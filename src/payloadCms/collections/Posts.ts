import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '../fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    readVersions: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    // preview: (doc) => formatPreviewURL("posts", doc),
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        rows: 10,
      },
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'blog',
      options: [
        {
          label: 'Blog',
          value: 'blog',
        },
        {
          label: {
            en: 'News / Berita',
            id: 'Berita',
          },
          value: 'news',
        },
        {
          label: { en: 'Press Release / Siaran Pers', id: 'Siaran Pers' },
          value: 'press-release',
        },
        {
          label: { en: 'Tutorial', id: 'Tutorial' },
          value: 'tutorial',
        },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      type: 'array',
      name: 'relatedPosts',
      admin: {
        // components: {
        //   RowLabel: ({ data }) => data?.title,
        // },
      },
      fields: [
        {
          type: 'text',
          name: 'category',
          required: true,
        },
        {
          type: 'text',
          name: 'title',
          required: true,
        },
        {
          type: 'upload',
          name: 'thumbnail',
          relationTo: 'media',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          type: 'text',
          name: 'url',
          label: 'URL',
          required: true,
        },
      ],
    },

    // {
    //   name: 'relatedPosts',
    //   type: 'relationship',
    //   relationTo: 'posts',
    //   hasMany: true,
    //   localized: true,
    //   filterOptions: ({ id }) => {
    //     return {
    //       id: {
    //         not_in: [id],
    //       },
    //     }
    //   },
    // },
    slugField('title'),
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'admins',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedOn',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
    {
      type: 'upload',
      name: 'featuredImage',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
