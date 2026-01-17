const getChapters = require('./getChapters.service');
const getChapterById = require('./getChapterById.service');
const createChapter = require('./createChapter.service');
const updateChapter = require('./updateChapter.service');
const deleteChapter = require('./deleteChapter.service');
const getChapterLeaders = require('./getChapterLeaders.service');
const getUpcomingEvents = require('./getUpcomingEvents.service');

module.exports = {
  getChapters,
  getChapterById,
  createChapter,
  updateChapter,
  deleteChapter,
  getChapterLeaders,
  getUpcomingEvents
};
