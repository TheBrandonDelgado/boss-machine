const express = require('express');
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const ideasRouter = express.Router();

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    const idea = getFromDatabaseById('ideas', ideaId);
    req.ideaId = ideaId;
    req.idea = idea;
    next();
})

ideasRouter.get('/', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    console.log(allIdeas)
    res.send(allIdeas);
});

ideasRouter.post('/', (req, res, next) => {
    const newIdea = req.body;
    addToDatabase('ideas', newIdea);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.idea);
    res.status(200).send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const isDeleted = deleteFromDatabasebyId('ideas', req.ideaId);
    if (isDeleted) {
        res.status(204).send('Successfully deleted');
    } else {
        res.status(404).send('Not Found');
    }
})

module.exports = ideasRouter;