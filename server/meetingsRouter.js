const express = require('express');
const { getAllFromDatabase } = require('./db');
const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next) => {
    const allMeetings = getAllFromDatabase('meetings');
    res.send(allMeetings);
})

module.exports = meetingsRouter;