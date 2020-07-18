/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    screens: {
      "sm": "640px",
      // => @media (min-width: 640px) { ... }

      "md": "768px",
      // => @media (min-width: 768px) { ... }

      "lg": "1024px",
      // => @media (min-width: 1024px) { ... }

      "xl": "1280px",
      // => @media (min-width: 1280px) { ... }

      "-xl": {max: "1279px"},
      // => @media (max-width: 1279px) { ... }

      "-lg": {max: "1023px"},
      // => @media (max-width: 1023px) { ... }

      "-md": {max: "767px"},
      // => @media (max-width: 767px) { ... }

      "-sm": {max: "639px"},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      colors: {
        "cher-primary": "rgba(var(--primary), var(--bg-opacity))",
        "cher-primary-rev": "rgba(var(--primary-rev), var(--bg-opacity))",
        "cher-primary-nu": "rgba(var(--primary-nu), var(--bg-opacity))",
        "cher-primary-nu-rev": "rgba(var(--primary-nu-rev), var(--bg-opacity))",
      }
    },
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
