const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    failOnStatusCode: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
