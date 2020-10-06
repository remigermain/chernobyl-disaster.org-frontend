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
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/$1",
  }
}
