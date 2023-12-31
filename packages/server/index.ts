import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer, type ViteDevServer } from 'vite';

dotenv.config();

import { configureStore } from '@reduxjs/toolkit';
import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { baseApi } from './store';

const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
    const app = express();
    app.use(cors());
    const port = Number(process.env.SERVER_PORT) || 3001;

    let vite: ViteDevServer | undefined;
    const distPath = path.dirname(require.resolve('client/dist/index.html'));
    const srcPath = path.dirname(require.resolve('client/index.html'));
    const ssrClientPath = require.resolve('client/ssr-dist/ssr.cjs');

    if (isDev() && vite) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            root: srcPath,
            appType: 'custom',
        });

        app.use(vite.middlewares);
    }

    app.get('/api', (_, res) => {
        res.json('👋 Howdy from the server :)');
    });

    if (!isDev()) {
        app.use('/assets', express.static(path.resolve(distPath, 'assets')));
        app.use('/img', express.static(path.resolve(distPath, 'img')));
    }

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl;
        const preloadedState = {};

        const store = configureStore({
            reducer: {
                [baseApi.reducerPath]: baseApi.reducer,
            },
            middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
            preloadedState,
        });

        try {
            let template: string | undefined;

            if (!isDev()) {
                template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
            } else {
                template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');

                template = (await vite?.transformIndexHtml(url, template)) ?? undefined;
            }

            interface SSRModule {
                render: (uri: string, store: unknown) => Promise<[string]>;
            }

            let mod: SSRModule;

            if (isDev()) {
                mod = (await vite?.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))) as SSRModule;
            } else {
                mod = await import(ssrClientPath);
            }

            const { render } = mod;
            const [appHtml] = await render(url, store);

            const scriptTag = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}</script>`;

            const html = template?.replace(`<!--ssr-outlet-->`, appHtml + scriptTag);

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            if (isDev()) {
                vite?.ssrFixStacktrace(e as Error);
            }
            next(e);
        }
    });

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}

startServer();
