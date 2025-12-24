const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/create', controller.createVenue);
router.get('/', controller.getVenues);
router.get('/:id', controller.getVenueById);
router.put('/update/:id', controller.updateVenue);
router.delete('/delete/:id', controller.deleteVenue);

module.exports = router;
