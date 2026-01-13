const services = require('./services');

const handleSlackEvents = async (req, res, next) => {
    try {
        const result = await services.processSlackEvent(req.body);
        // Slack expects a direct JSON response, not wrapped in a standard API envelope often.
        // However, our middleware might wrap it. Let's return the raw object and let middleware handle or bypass.
        // Actually, SlackbotController in Rails returns { text, attachments }.
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleSlackEvents
};
