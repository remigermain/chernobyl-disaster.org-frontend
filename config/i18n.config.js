export default {
  locales: [
    {
      code: 'fr',
      iso: 'fr-FR',
      file: 'fr-FR.json',
      name: 'Français',
    },
    {
      code: 'en',
      iso: 'en-US',
      file: 'en-US.json',
      name: 'English',
    },
  ],
  baseUrl: process.env.SITE_URL,
  strategy: 'prefix_except_default',
  defaultLocale: 'en',
  lazy: true,
  langDir: 'locales/',
  seo: true,
}
