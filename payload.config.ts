import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  lexicalEditor,
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Rich text editor configured for blog posts
// H1 is intentionally excluded — that's the post title field
const blogEditor = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    InlineCodeFeature(),
    AlignFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    BlockquoteFeature(),
    HorizontalRuleFeature(),
    LinkFeature({ enabledCollections: [] }),
    UploadFeature({
      collections: {
        media: {
          fields: [
            { name: 'caption', type: 'text', label: 'Natpis ispod slike' },
          ],
        },
      },
    }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '– CSLOG Admin',
    },
  },

  collections: [
    // ─── Users ───────────────────────────────────────────────────────────────
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [
        { name: 'name', type: 'text', label: 'Ime' },
      ],
    },

    // ─── Posts (Blog) ─────────────────────────────────────────────────────────
    {
      slug: 'posts',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'status', 'publishedAt'],
        listSearchableFields: ['title', 'slug'],
        description: 'Blog postovi — CSLOG priče',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            // Auto-generate slug from title on first save
            if (data?.title && !data?.slug) {
              data.slug = data.title
                .toLowerCase()
                .replace(/[čć]/g, 'c')
                .replace(/[šs]/g, (m: string) => m === 'š' ? 's' : m)
                .replace(/[žz]/g, (m: string) => m === 'ž' ? 'z' : m)
                .replace(/[đ]/g, 'd')
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')
            }
            return data
          },
        ],
      },
      fields: [
        // ── Main content ──
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Naslov posta',
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          label: 'URL (slug)',
          admin: {
            description: 'Automatski se popunjava iz naslova. Menjajte samo ako je neophodno.',
          },
        },
        {
          name: 'coverImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Naslovna fotografija',
        },
        {
          name: 'excerpt',
          type: 'textarea',
          label: 'Kratak opis',
          admin: {
            description: 'Prikazuje se u listingu blogova i kao meta opis (ako SEO polje nije popunjeno). Max 200 karaktera.',
          },
        },
        {
          name: 'content',
          type: 'richText',
          editor: blogEditor,
          label: 'Sadržaj',
        },

        // ── Sidebar ──
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'draft',
          label: 'Status',
          options: [
            { label: 'Radna verzija', value: 'draft' },
            { label: 'Objavljeno', value: 'published' },
          ],
          admin: { position: 'sidebar' },
        },
        {
          name: 'publishedAt',
          type: 'date',
          label: 'Datum objave',
          admin: {
            position: 'sidebar',
            date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
          },
        },

        // ── SEO ──
        {
          name: 'seo',
          type: 'group',
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta naslov',
              admin: { description: 'Prikazuje se u pretraživaču i Google rezultatima. Preporučeno: 50–60 karaktera.' },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta opis',
              admin: { description: 'Prikazuje se ispod naslova u Google rezultatima. Preporučeno: 150–160 karaktera.' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'OG fotografija',
              admin: { description: 'Fotografija koja se prikazuje kada se post deli na društvenim mrežama. Idealno: 1200×630px.' },
            },
          ],
        },
      ],
    },

    // ─── Gallery ─────────────────────────────────────────────────────────────
    {
      slug: 'gallery',
      admin: { useAsTitle: 'caption', description: 'Fotografije za galeriju' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Fotografija' },
        { name: 'caption', type: 'text', label: 'Opis' },
        {
          name: 'category',
          type: 'select',
          label: 'Kategorija',
          options: [
            { label: 'Transport', value: 'transport' },
            { label: 'Prikolice', value: 'prikolice' },
            { label: 'Tim', value: 'tim' },
          ],
        },
      ],
    },

    // ─── Media ───────────────────────────────────────────────────────────────
    {
      slug: 'media',
      upload: true,
      admin: { description: 'Sve fotografije i fajlovi' },
      fields: [
        { name: 'alt', type: 'text', label: 'Alt tekst (važno za SEO i pristupačnost)' },
      ],
    },
  ],

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
