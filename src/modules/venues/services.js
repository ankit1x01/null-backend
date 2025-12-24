const { Venue } = require('../../shared/models'); 

const createVenue = async (venueData) => {
  return await Venue.create(venueData);
};

const getVenues = async () => {
  return await Venue.findAll();
};

const getVenueById = async (id) => {
  return await Venue.findByPk(id);
};

const updateVenue = async (id, venueData) => {
  const venue = await Venue.findByPk(id);
  if (!venue) {
    throw new Error('Venue not found');
  }
  return await venue.update(venueData);
};

const deleteVenue = async (id) => {
  const venue = await Venue.findByPk(id);
  if (!venue) {
    throw new Error('Venue not found');
  }
  return await venue.destroy();
};

module.exports = {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue
};
