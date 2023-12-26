import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { fileURLToPath, URL } from 'node:url';
import * as dotenv from 'dotenv';

dotenv.config();

const generateScopedName = '[name]__[local]--[hash:base64:5]';
const hashName = '[hash:base64:5]';

export default defineConfig(({ mode }) => {
    const cssModulesName = mode === 'development' ? generateScopedName.replace('-module', '') : hashName;

    return {
        plugins: [react()],
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
                // TODO: check how to fix this
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore resolving by vite
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    };
});
