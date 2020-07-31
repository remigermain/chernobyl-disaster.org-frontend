/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
      zIndex: {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "10": "10",
        "12": "12",
        "13": "13",
        "14": "14",
        "15": "15",
        "16": "16",
        "17": "17",
        "18": "18",
        "19": "19",
      },
      width: {
        "10px": "10px",
        "14px": "14px",
        "16px": "16px",
        "18px": "18px",
        "20px": "20px",
        "24px": "24px",
        "32px": "32px",
        "40px": "40px",
        "inherit": "inherit"
      },
      height: {
        "inherit": "inherit"
      },
      screens: {
        "xl": "1280px",
        "-xl": {max: "1279px"},
        "-lg": {max: "1023px"},
        "-md": {max: "767px"},
        "-sm": {max: "639px"},
      },
      inset: {
        "25": "25%",
        "50": "50%",
        "75": "75%",
      },
      transitionDuration: {
        "400": ".4s"
      },
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
