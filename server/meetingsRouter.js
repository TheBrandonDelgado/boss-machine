const express = require('express');
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');
const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next) => {
    const allMeetings = getAllFromDatabase('meetings');
    res.send(allMeetings);
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting();
    const addedMeeting = addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    const isEmpty = deleteAllFromDatabase('meetings');
    if (isEmpty.length === 0) {
        res.status(204).send('Successfully deleted');
    } else {
        res.status(404).send('Not found');
    }
});

module.exports = meetingsRouter;