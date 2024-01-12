const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

minionsRouter.param('minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const fetchedMinion = getFromDatabaseById('minions', minionId);
    req.minionId = minionId;
    req.fetchedMinion = fetchedMinion;
    next();
})

minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = req.body;
    addToDatabase('minions', newMinion);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.fetchedMinion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.fetchedMinion);
    res.status(200).send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const isDeleted = deleteFromDatabasebyId('minions', req.minionId);
    if (isDeleted) {
        res.status(204).send('Successfully deleted');
    } else {
        res.status(404).send('Not Found');
    }
})

module.exports = minionsRouter;