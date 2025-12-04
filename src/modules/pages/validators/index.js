/**
 * Pages Validators
 * Export all pages validators
 */
const createPage = require('./createPage.validator');
const getPages = require('./getPages.validator');
const getPageById = require('./getPageById.validator');
const updatePage = require('./updatePage.validator');
const deletePage = require('./deletePage.validator');

module.exports = {
  createPage,
  getPages,
  getPageById,
  updatePage,
  deletePage,
};
