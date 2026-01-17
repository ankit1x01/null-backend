/**
 * Admin Users Routes
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// Public route for admin login
router.post('/login', controller.adminLogin);

// Protected routes - require admin auth
router.use(jwt.verifyToken);
router.use(jwt.isAdmin);

router.get('/getAdminUsers', controller.getAdminUsers);
router.get('/getAdminUserById/:id', controller.getAdminUserById);
router.post('/createAdminUser', controller.createAdminUser);
router.put('/updateAdminUser/:id', controller.updateAdminUser);
router.put('/toggleActive/:id', controller.toggleActive);
router.put('/changePassword/:id', controller.changePassword);
router.delete('/deleteAdminUser/:id', controller.deleteAdminUser);

module.exports = router;
