import express from 'express';
import * as https from 'https';

import { Comment, Topic, User } from '../index';

export const router = express.Router();

interface AuthOptions {
    host: string;
    path: string;
    headers?: Record<string, string>;
}

router.use(function checkAuth(_req, _res, next) {
    if (_req.headers?.cookie || _req.originalUrl == '/api/auth') {
        const options: AuthOptions = {
            host: 'ya-praktikum.tech',
            path: '/api/v2/auth/user',
        };
        if (_req.headers?.cookie) {
            options.headers = {
                cookie: _req.headers?.cookie,
            };
        }
        https.get(options, (res) => {
            res.on('data', function (chunk) {
                if (res.statusCode == 200) {
                    _res.locals.user = JSON.parse(chunk);
                    User.findOrCreate({
                        where: {
                            login: _res.locals.user.login,
                        },
                        defaults: {
                            name:
                                _res.locals.user.display_name ||
                                _res.locals.user.first_name + ' ' + _res.locals.user.second_name,
                            avatar: '/practicum/resources' + _res.locals.user.avatar,
                        },
                    })
                        .then((res) => {
                            const [user] = res;
                            _res.locals.userId = user.id;
                            next();
                        })
                        .catch((error) => {
                            _res.status(403).end(JSON.stringify({ reason: error }));
                            console.error('Failed to create a user record : ', error);
                        });
                } else {
                    next();
                }
            });
        });
    } else {
        _res.status(403).end(JSON.stringify({ reason: 'Unauthorized' }));
    }
});

router.get('/topic', (_req, _res) => {
    Topic.findAll({
        include: {
            model: User,
            attributes: ['name', 'avatar'],
            as: 'author',
        },
        order: [['createdAt', 'DESC']],
    })
        .then((res) => {
            _res.send(res);
        })
        .catch((error) => {
            _res.status(400).end(JSON.stringify({ reason: error }));
            console.error('Failed to retrieve data : ', error);
        });
});

router.get('/topic/:topicId', (_req, _res) => {
    Topic.findOne({
        include: {
            model: User,
            attributes: ['name', 'avatar'],
            as: 'author',
        },
        where: {
            id: _req.params.topicId,
        },
        order: [['createdAt', 'DESC']],
    })
        .then((res) => {
            _res.send(res);
        })
        .catch((error) => {
            _res.status(400).end(JSON.stringify({ reason: error }));
            console.error('Failed to retrieve data : ', error);
        });
});

router.post('/topic', async (_req, _res) => {
    Topic.create({
        title: _req.body.title || 'No title',
        text: _req.body.text || 'No text',
        authorId: _res.locals.userId,
    })
        .then((res) => {
            _res.send(res);
        })
        .catch((error) => {
            _res.status(400).end(JSON.stringify({ reason: error }));
            console.error('Failed to create a new record : ', error);
        });
});

router.get('/comment', function (_req, _res) {
    const topic = _req.query.topic;
    if (!topic) {
        _res.status(400).end(JSON.stringify({ reason: 'topic field required' }));
        return;
    }
    Comment.findAll({
        include: {
            model: User,
            attributes: ['name', 'avatar'],
            as: 'author',
        },
        order: [['createdAt', 'ASC']],
        where: {
            topicId: topic,
        },
    })
        .then((res) => {
            _res.send(res);
        })
        .catch((error) => {
            _res.status(400).end(JSON.stringify({ reason: error }));
            console.error('Failed to retrieve data : ', error);
        });
});

router.post('/comment', function (_req, _res) {
    Comment.create({
        text: _req.body.text || 'No text',
        parentComment: _req.body.parentComment || null,
        topicId: _req.body.topic,
        authorId: _res.locals.userId,
    })
        .then((res) => {
            _res.send(res);
        })
        .catch((error) => {
            _res.status(400).end(JSON.stringify({ reason: error }));
            console.error('Failed to create a new record : ', error);
        });
});

router.get('/user', (_req, _res) => {
    _res.send(_res.locals.user);
});
