const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

minionsRouter.param('minionId', (req, res, next, minionId) => {
    const fetchedMinion = getFromDatabaseById('minions', minionId);

    if (fetchedMinion == null) {
         res.status(404).send("Not Found");
    }

    req.minionId = minionId;
    req.fetchedMinion = fetchedMinion;
    next();
});

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
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.status(200).send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const isDeleted = deleteFromDatabasebyId('minions', req.minionId);
    if (isDeleted) {
        res.status(204).send('Successfully deleted');
    } else {
        res.status(404).send('Not Found');
    }
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const allWork = getAllFromDatabase('work');
    const minionWork = allWork.filter(job => job.minionId == req.minionId);
    res.send(minionWork);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = addToDatabase('work', req.body);
    res.status(201).send(newWork);
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    try {
        const newWork = updateInstanceInDatabase('work', req.body);
        res.status(201).send(newWork);
    } catch (error) {
        res.status(400).send(error);
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    try {
        const isDeleted = deleteFromDatabasebyId('work', req.params.workId);
        res.status(204).send('Successfully deleted');
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = minionsRouter;