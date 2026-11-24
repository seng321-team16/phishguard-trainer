import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      // One coverage/ folder at the repository root, one sub-folder per workspace.
      reportsDirectory: '../coverage/api',
      include: ['src/**/*.ts'],
      // server.ts only binds the port; it is covered by the E2E tests.
      exclude: ['src/**/*.test.ts', 'src/server.ts'],
    },
  },
});
