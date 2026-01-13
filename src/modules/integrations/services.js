const { Op } = require('sequelize');
const { Chapter, Event } = require('../../shared/models');

const processSlackEvent = async (payload) => {
    const { token, text } = payload;
    const verificationToken = process.env.SLACK_VERIFICATION_TOKEN || 'test-token';

    if (token !== verificationToken) {
        return { text: 'Failed to verify slack token' };
    }

    if (!text) {
        return { text: "I cannot search without a chapter name ¯\\_(ツ)_/¯" };
    }

    const chapter = await Chapter.findOne({
        where: {
            name: { [Op.like]: text } // Case-insensitive like often handled by DB collation, or use lower function
        }
        // Note: SQLite/MySQL behavior on LIKE varies for case sensitivity. exact match 'lower(name) = ?' in Rails. 
        // We'll trust Sequelize/DB settings or iterate.
    });

    if (!chapter) {
        return { text: "I cannot find the chapter you are looking for ¯\\_(ツ)_/¯" };
    }

    const events = await Event.findAll({
        where: {
            chapter_id: chapter.id,
            public: true,
            start_time: { [Op.gt]: new Date() }
        }
    });

    return {
        text: `I found ${events.length} event(s) scheduled for ${chapter.name} chapter`,
        attachments: events.map(e => ({ text: e.name }))
    };
};

module.exports = {
    processSlackEvent
};
