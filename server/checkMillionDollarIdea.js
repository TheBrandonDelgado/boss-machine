const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    const totalRevenue = Number(numWeeks) * Number(weeklyRevenue);
    if ( totalRevenue >= 1000000) {
        req.totalRevenue = totalRevenue;
        next();
    } else {
        res.status(400).send('Invalid input');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
