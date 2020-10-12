module.exports = {
  moduleFileExtensions: ['js', 'vue'],
  modulePaths: [
    "<rootDir>/",
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  testPathIgnorePatterns: ["<rootDir>/.nuxt/", "<rootDir>/node_modules/"],
  // for convert import to locale directory
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/$1",
  }
}
