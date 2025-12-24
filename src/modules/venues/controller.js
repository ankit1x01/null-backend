const services = require('./services');
const constants = require('./constants');

const createVenue = async (req, res, next) => {
  try {
    const result = await services.createVenue(req.body);
    res.status(201).json({
      ...constants.createVenue,
      result
    });
  } catch (error) {
    next(error);
  }
};

const getVenues = async (req, res, next) => {
  try {
    const result = await services.getVenues();
    res.status(200).json({
      ...constants.getVenues,
      result
    });
  } catch (error) {
    next(error);
  }
};

const getVenueById = async (req, res, next) => {
  try {
    const result = await services.getVenueById(req.params.id);
    res.status(200).json({
      ...constants.getVenueById,
      result
    });
  } catch (error) {
    next(error);
  }
};

const updateVenue = async (req, res, next) => {
  try {
    const result = await services.updateVenue(req.params.id, req.body);
    res.status(200).json({
      ...constants.updateVenue,
      result
    });
  } catch (error) {
    next(error);
  }
};

const deleteVenue = async (req, res, next) => {
  try {
    const result = await services.deleteVenue(req.params.id);
    res.status(200).json({
      ...constants.deleteVenue,
      result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue
};
