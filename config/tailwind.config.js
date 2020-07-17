/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    borderColor: theme => ({
      ...theme("colors"),
    })
  },
  variants: {
    float: ["responsive", "direction"],
    margin: ["responsive", "direction"],
    padding: ["responsive", "direction"],
    spinner: ["responsive"],
  },
  plugins: [
    require("tailwindcss-dir")(),
    require("tailwindcss-spinner")({ className: "spinner", themeKey: "spinner" }),
    require("@tailwindcss/custom-forms"),
  ],
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["components/**/*.vue", "layouts/**/*.vue", "pages/**/*.vue"]
  }
}