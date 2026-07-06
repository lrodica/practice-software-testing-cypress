const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
