export default {
  locales: [
    {
      code: "fr",
      iso: "fr-FR",
      file: "fr-FR.json",
      name: "Français",
    },
    {
      code: "en",
      iso: "en-US",
      file: "en-US.json",
      name: "English",
    },
  ],
  strategy: "prefix",
  defaultLocale: "en",
  lazy: true,
  langDir: "locales/",
  seo: true,
}
