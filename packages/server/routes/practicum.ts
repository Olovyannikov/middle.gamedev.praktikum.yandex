import express from 'express';
import * as https from 'https';

export const router = express.Router();

interface RequestOptions {
    host: string;
    path: string;
    method?: string;
    headers?: Record<string, string | number>;
}

router.use('*', (_req, _res) => {
    const path = _req.baseUrl.replace('/practicum', '');

    const options: RequestOptions = {
        host: 'ya-praktikum.tech',
        path: '/api/v2' + path,
        method: _req.method,
        headers: {},
    };
    if (_req.headers?.cookie && options.headers) {
        options.headers.cookie = _req.headers?.cookie;
    }
    if (_req.body && options.headers) {
        options.headers['Content-Type'] = 'application/json';
        options.headers['Content-Length'] = JSON.stringify(_req.body).length;
    }
    const req = https.request(options, (res) => {
        const proxyCookies: string[] = [];
        res.headers['set-cookie']?.forEach((e) => proxyCookies.push(e.replace('Domain=ya-praktikum.tech', '')));
        _res.writeHead(200, {
            'Set-Cookie': proxyCookies,
        });
        res.on('data', function (chunk) {
            _res.status(res.statusCode || 400).end(chunk);
        });
    });

    req.on('error', (e) => {
        _res.status(400).end(JSON.stringify({ reason: e }));
        console.error('Error: ' + e);
    });

    if (_req.body) req.write(JSON.stringify(_req.body));
    req.end();
});
