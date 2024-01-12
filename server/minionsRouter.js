const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase } = require('./db');

minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
});

module.exports = minionsRouter;