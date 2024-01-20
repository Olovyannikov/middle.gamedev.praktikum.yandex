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
    if ((_req.headers?.cookie && _req.headers?.cookie.indexOf('authCookie') > -1) || _req.originalUrl == '/api/auth') {
        const options: AuthOptions = {
            host: 'ya-praktikum.tech',
            path: '/api/v2/auth/user',
        };
        if (_req.headers?.cookie) {
            options.headers = {
                cookie: _req.headers?.cookie,
            };
        }
        const ssoCookie = _req.headers?.cookie?.indexOf('isSSO=true');
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
                            isSSO: ssoCookie && ssoCookie > -1,
                        },
                    })
                        .then((res) => {
                            const [user] = res;
                            _res.locals.userId = user.id;
                            //TODO разобраться почему сюда не попадает тип userModel
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            _res.locals.user.isSSO = user.isSSO;
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            _res.locals.user.theme = user.theme;
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
            res.on('error', function (err) {
                _res.status(_res.statusCode).end(JSON.stringify({ reason: err }));
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
        include: [
            {
                model: User,
                attributes: ['name', 'avatar'],
                as: 'author',
            },
        ],
        where: {
            id: _req.params.topicId,
        },
    })
        .then((res) => {
            if (!res) _res.status(404).end(JSON.stringify({ reason: 'Not found' }));
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

router.get('/comment/:topicId', function (_req, _res) {
    Comment.findAll({
        include: {
            model: User,
            attributes: ['name', 'avatar'],
            as: 'author',
        },
        order: [['createdAt', 'ASC']],
        where: {
            topicId: _req.params.topicId,
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
        topicId: _req.body.topicId,
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

router.post('/theme', function (_req, _res) {
    User.update(
        {
            theme: _req.body.theme,
        },
        {
            where: {
                id: _res.locals.userId,
            },
        }
    )
        .then(() => {
            _res.send(JSON.stringify({ response: 'success' }));
        })
        .catch((error) => {
            _res.status(400).end(JSON.stringify({ reason: error }));
            console.error('Failed chacnge theme : ', error);
        });
});
