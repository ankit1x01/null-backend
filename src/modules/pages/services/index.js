/**
 * Pages Services
 * Export all pages services
 */
const createPage = require('./createPage.service');
const getPages = require('./getPages.service');
const getPageById = require('./getPageById.service');
const updatePage = require('./updatePage.service');
const deletePage = require('./deletePage.service');

module.exports = {
  createPage,
  getPages,
  getPageById,
  updatePage,
  deletePage,
};
