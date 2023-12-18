import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

const generateScopedName = '[name]__[local]--[hash:base64:5]';
const hashName = '[hash:base64:5]';

export default defineConfig(({ mode }) => {
    const cssModulesName =
        mode === 'development'
            ? generateScopedName.replace('-module', '')
            : hashName;

    return {
        css: {
            modules: {
                generateScopedName: cssModulesName,
            },
            preprocessorOptions: {
                scss: {
                    // additionalData:
                    //     '@import "./src/app/assets/styles/general/_mixins.scss";',
                },
            },
            devSourcemap: true,
        },
        server: {
            port: Number(process.env.CLIENT_PORT) || 3000,
        },
        define: {
            __SERVER_PORT__: Number(process.env.SERVER_PORT) || 3001,
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        plugins: [react()],
    };
});
