import express from 'express';

import { Comment, Topic, User } from '../index';
export const router = express.Router();

router.use(function checkAuth(_req, _res, next) {
    next();
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
    console.log('Request body: ' + JSON.stringify(request.body));
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
    console.log('Request body: ' + JSON.stringify(request.body));
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
