const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

router.post('/create', jwt.verifyToken, jwt.isAdmin, controller.createVenue);
router.get('/', controller.getVenues);
router.get('/:id', controller.getVenueById);
router.put('/update/:id', jwt.verifyToken, jwt.isAdmin, controller.updateVenue);
router.delete('/delete/:id', jwt.verifyToken, jwt.isAdmin, controller.deleteVenue);

module.exports = router;
