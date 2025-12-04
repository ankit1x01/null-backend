/**
 * ChapterLeads Services
 * Export all chapter-leads services
 */
const createChapterLead = require('./createChapterLead.service');
const getChapterLeads = require('./getChapterLeads.service');
const getChapterLeadById = require('./getChapterLeadById.service');
const updateChapterLead = require('./updateChapterLead.service');
const deleteChapterLead = require('./deleteChapterLead.service');

module.exports = {
  createChapterLead,
  getChapterLeads,
  getChapterLeadById,
  updateChapterLead,
  deleteChapterLead,
};
