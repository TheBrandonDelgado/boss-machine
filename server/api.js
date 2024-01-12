const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minionsRouter');
const ideasRouter = require('./ideasRouter');
const meetingsRouter = require('./meetingsRouter');

apiRouter.use('/minions', minionsRouter);
// app.use('/ideas', ideasRouter);
// app.use('/meetings', meetingsRouter);

module.exports = apiRouter;
