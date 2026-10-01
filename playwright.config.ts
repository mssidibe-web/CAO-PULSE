import {defineConfig} from '@playwright/test';

const port = 3100;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: './tests/e2e',
  use: {baseURL, trace: 'retain-on-failure'},
  webServer: {
    command: `npm run dev -- --port ${port}`,
    url: `${baseURL}/api/health`,
    reuseExistingServer: false,
    timeout: 120000,
  },
});

