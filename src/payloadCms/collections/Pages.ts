import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '../fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
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
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          admin: {
            condition: (_, siblingData) => siblingData.template === 'page-with-hero',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'text',
            },
            {
              name: 'image',
              label: 'Media',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Background image for the hero section',
              },
            },
            {
              name: 'link',
              label: 'Link',
              type: 'text',
            },
            {
              name: 'linkLabel',
              label: 'Link Label',
              type: 'text',
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              // Pass the Lexical editor here and override base settings as necessary
              // editor: lexicalEditor({}),
            },
          ],
        },
      ],
    },
    {
      type: 'array',
      name: 'relatedPages',
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
    //   name: "relatedPages",
    //   type: "relationship",
    //   relationTo: "pages",
    //   hasMany: true,
    //   localized: true,
    //   filterOptions: ({ id }) => {
    //     return {
    //       id: {
    //         not_in: [id],
    //       },
    //     };
    //   },
    // },
    slugField('title'),
    {
      name: 'template',
      label: 'Template',
      type: 'select',
      defaultValue: 'page-with-hero',
      options: [
        {
          label: 'Homepage',
          value: 'homepage',
        },
        {
          label: 'Page with hero',
          value: 'page-with-hero',
        },
        {
          label: 'Page without hero',
          value: 'page-without-hero',
        },
      ],
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        // beforeValidate: [formatSlug(fieldToUse)],
      },
    },
  ],
}
