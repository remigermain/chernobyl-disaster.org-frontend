export default {
  locales: [
    { code: "fr", iso: "fr-FR", name: "Francais", file: "fr.json" },
    { code: "en", iso: "en-UK", name: "english", file: "en.json" }
  ],
  strategy: "prefix",
  defaultLocale: "fr",
  lazy: true,
  langDir: "locales/",
  seo: true,
}
