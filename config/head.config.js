const image = ''
const title = ''
const description = ''

export default {
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: description
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      hid: 'twitter:site',
      name: 'twitter:site',
      content: '@' + process.env.SITE_URL
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: process.env.SITE_URL
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: title
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: image
    },
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: process.env.SITE_NAME
    },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    {
      hid: 'og:url',
      property: 'og:url',
      content: process.env.SITE_URL
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: title
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: image
    },
    {
      hid: 'og:image:secure_url',
      property: 'og:image:secure_url',
      content: image
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: title
    }
  ]
}
