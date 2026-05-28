import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        base: './',
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        phaser: ['phaser']
                    }
                }
            },
        },
        server: {
            allowedHosts: [env.VITE_REMOTE_URL],
            port: 8080
        }
  }
});
