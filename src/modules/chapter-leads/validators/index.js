/**
 * ChapterLeads Validators
 * Export all chapter-leads validators
 */
const createChapterLead = require('./createChapterLead.validator');
const getChapterLeads = require('./getChapterLeads.validator');
const getChapterLeadById = require('./getChapterLeadById.validator');
const updateChapterLead = require('./updateChapterLead.validator');
const deleteChapterLead = require('./deleteChapterLead.validator');

module.exports = {
  createChapterLead,
  getChapterLeads,
  getChapterLeadById,
  updateChapterLead,
  deleteChapterLead,
};
