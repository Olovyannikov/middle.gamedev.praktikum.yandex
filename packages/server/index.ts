import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { createServer as createViteServer, type ViteDevServer } from 'vite';

import { router as apiRouter } from './routes/api';

const isSSR = () => {
    let isSSR = false;
    process.argv.forEach((e) => {
        if (e.indexOf('SSR') > -1) isSSR = true;
    });
    return isSSR;
};

if (isSSR()) dotenv.config();
else dotenv.config({ path: '../../.env' });

import { configureStore } from '@reduxjs/toolkit';
import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { commentModel } from './models/comment';
import { topicModel } from './models/topic';
import { userModel } from './models/user';
import { baseApi } from './store';

const isDev = () => process.env.NODE_ENV === 'development';

const sequelizeOptions: SequelizeOptions = {
    host: 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);

export const User = sequelize.define('User', userModel, {});
export const Topic = sequelize.define('Topic', topicModel, {});
export const Comment = sequelize.define('Comment', commentModel, {});
Comment.belongsTo(Comment, { foreignKey: 'parentComment' });
Comment.belongsTo(Topic, { as: 'topic' });
Topic.belongsTo(User, { as: 'author' });
Comment.belongsTo(User, { as: 'author' });

async function startServer() {
    const app = express();
    app.use(cors({ credentials: true, origin: 'http://http://thesnake.ya-praktikum.tech/:80' }));

    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    const port = Number(process.env.SERVER_PORT) || 80;

    let vite: ViteDevServer | undefined;
    const distPath = path.dirname(require.resolve('client/dist/index.html'));
    const srcPath = path.dirname(require.resolve('client/index.html'));
    const ssrClientPath = require.resolve('client/ssr-dist/ssr.cjs');

    if (isDev()) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            root: srcPath,
            appType: 'custom',
        });

        //app.use(vite.middlewares);
    }

    app.use('/api', apiRouter);
    app.use(
        '/practicum/*',
        createProxyMiddleware('/', {
            changeOrigin: true,
            cookieDomainRewrite: {
                '*': 'http://thesnake.ya-praktikum.tech/',
            },
            target: 'https://ya-praktikum.tech',
            pathRewrite: function (path) {
                return path.replace('/practicum', '/api/v2');
            },
            onProxyReq: fixRequestBody,
            onProxyRes: (proxyRes, _req, _res) => {
                if (_req.method.toLowerCase() == 'post' && _req.path.indexOf('/oauth/yandex') > -1) {
                    proxyRes.headers['set-cookie']?.push(
                        'isSSO=true; Domain=http://thesnake.ya-praktikum.tech/; Path=/; HttpOnly; Secure; SameSite=None'
                    );
                }
                if (_req.path.indexOf('/auth/logout') > -1) {
                    proxyRes.headers['set-cookie']?.push(
                        'isSSO=; max-age=0; Domain=http://thesnake.ya-praktikum.tech/; Path=/; HttpOnly; Secure; SameSite=None'
                    );
                }
            },
        })
    );

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

    sequelize.sync().then(() => {
        app.listen(port, () => {
            console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
        });
    });
}

startServer();
