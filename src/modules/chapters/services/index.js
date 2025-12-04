const getChapters = require('./getChapters.service');
const getChapterById = require('./getChapterById.service');
const createChapter = require('./createChapter.service');
const updateChapter = require('./updateChapter.service');
const deleteChapter = require('./deleteChapter.service');

module.exports = {
  getChapters,
  getChapterById,
  createChapter,
  updateChapter,
  deleteChapter
};
