import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com/',
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
