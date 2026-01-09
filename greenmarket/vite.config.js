import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 5173,
        strictPort: true,
        watch: {
            usePolling: true,
            interval: 100,
        },
        // test: {
        //     globals: true,
        //     environment: 'jsdom',
        //     setupFiles: './src/setupTesting.js',
        // },
    },
});
