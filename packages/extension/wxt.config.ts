import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [react()],
  }),
  manifest: {
    name: 'Aura - Intelligent Writing Partner',
    description: 'Your AI-powered writing coach that helps you learn while you write',
    version: '1.0.0',
    permissions: ['storage', 'activeTab'],
    host_permissions: ['<all_urls>'],
    action: {
      default_title: 'Aura Writing Partner',
    },
  },
  runner: {
    disabled: false,
    chromiumArgs: ['--auto-open-devtools-for-tabs'],
  },
});

