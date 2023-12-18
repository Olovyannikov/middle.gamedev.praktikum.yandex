import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { fileURLToPath, URL } from 'node:url';

dotenv.config();

const generateScopedName = '[name]__[local]--[hash:base64:5]';
const hashName = '[hash:base64:5]';

export default defineConfig(({ mode }) => {
    const cssModulesName =
        mode === 'development'
            ? generateScopedName.replace('-module', '')
            : hashName;

    return {
        plugins: [react()],
        css: {
            modules: {
                generateScopedName: cssModulesName,
            },
            preprocessorOptions: {
                scss: {
                    additionalData:
                        '@import "./src/app/assets/styles/general/_mixins.scss";',
                },
            },
            devSourcemap: true,
        },
        build: {
            outDir: 'ssr-dist',
            ssr: true,
            lib: {
                entry: path.resolve(__dirname, 'ssr.tsx'),
                name: 'Client',
                formats: ['cjs'],
            },
            rollupOptions: {
                output: {
                    dir: 'ssr-dist',
                },
            },
        },
        ssr: {
            format: 'cjs',
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    };
});
