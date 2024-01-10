import express from 'express';
import * as https from 'https';

import { Comment, Topic, User } from '../index';
export const router = express.Router();

type authOptions = {
    host: string;
    path: string;
    headers?: Record<string, string>;
};

router.use(function checkAuth(_req, _res, next) {
    if (_req.headers?.cookie || _req.originalUrl == '/api/auth') {
        const options: authOptions = {
            host: 'ya-praktikum.tech',
            path: '/api/v2/auth/user',
        };
        if (_req.headers?.cookie) {
            options.headers = {
                cookie: _req.headers?.cookie,
            };
        }
        https.get(options, (res) => {
            console.log(res.statusCode, res.statusMessage);
        });
        next();
    } else {
        _res.status(401).end(JSON.stringify({ error: 'Unauthorized' }));
    }
});

router.get('/topic', function (_, response) {
    Topic.findAll({
        include: User,
    })
        .then((res) => {
            response.send(res);
        })
        .catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });
});

router.post('/topic', function (request, response) {
    Topic.create({
        title: request.body.title || 'No title',
        text: request.body.text || 'No text',
    })
        .then((res) => {
            response.send(res);
        })
        .catch((error) => {
            console.error('Failed to create a new record : ', error);
        });
});

router.get('/comment', function (_, response) {
    Comment.findAll({
        include: User,
    })
        .then((res) => {
            response.send(res);
        })
        .catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });
});

router.post('/comment', function (request, response) {
    Comment.create({
        text: request.body.text || 'No text',
        parentComment: request.body.parentComment || null,
        topic: request.body.topic,
    })
        .then((res) => {
            response.send(res);
        })
        .catch((error) => {
            console.error('Failed to create a new record : ', error);
        });
});

router.post('/auth', (request, response) => {
    const login = request.body.login;
    const password = request.body.password;
    if (!login || !password) response.status(400).send('No data');

    const authData = JSON.stringify(request.body);
    const req = https.request(
        {
            host: 'ya-praktikum.tech',
            path: '/api/v2/auth/signin',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': authData.length,
            },
        },
        (res) => {
            const proxyCookies: string[] = [];
            res.headers['set-cookie']?.forEach((e) => proxyCookies.push(e.replace('Domain=ya-praktikum.tech', '')));
            response.writeHead(200, {
                'Set-Cookie': proxyCookies,
            });

            response.end(`OK`);
        }
    );

    req.on('error', (e) => {
        console.error('Error: ' + e);
    });

    req.write(authData);
    req.end();
});
