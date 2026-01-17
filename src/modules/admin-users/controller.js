/**
 * Admin Users Controller
 */
const service = require('./services');
const { successResponse, errorResponse } = require('../../shared/utils/response');
const jwt = require('jsonwebtoken');

const getAdminUsers = async (req, res) => {
  try {
    const admins = await service.getAllAdminUsers();
    return successResponse(res, 'Admin users retrieved', admins);
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return errorResponse(res, error.message, 500);
  }
};

const getAdminUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await service.getAdminUserById(id);
    if (!admin) {
      return errorResponse(res, 'Admin user not found', 404);
    }
    return successResponse(res, 'Admin user retrieved', admin);
  } catch (error) {
    console.error('Error fetching admin user:', error);
    return errorResponse(res, error.message, 500);
  }
};

const createAdminUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Email and password are required', 400);
    }

    const existing = await service.getAdminUserByEmail(email);
    if (existing) {
      return errorResponse(res, 'Admin with this email already exists', 400);
    }

    const admin = await service.createAdminUser({ email, password, name, role });
    return successResponse(res, 'Admin user created', admin, 201);
  } catch (error) {
    console.error('Error creating admin user:', error);
    return errorResponse(res, error.message, 400);
  }
};

const updateAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await service.updateAdminUser(id, req.body);
    if (!admin) {
      return errorResponse(res, 'Admin user not found', 404);
    }
    return successResponse(res, 'Admin user updated', admin);
  } catch (error) {
    console.error('Error updating admin user:', error);
    return errorResponse(res, error.message, 400);
  }
};

const deleteAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteAdminUser(id);
    if (!deleted) {
      return errorResponse(res, 'Admin user not found', 404);
    }
    return successResponse(res, 'Admin user deleted');
  } catch (error) {
    console.error('Error deleting admin user:', error);
    return errorResponse(res, error.message, 400);
  }
};

const toggleActive = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await service.toggleActive(id);
    if (!admin) {
      return errorResponse(res, 'Admin user not found', 404);
    }
    return successResponse(res, `Admin user ${admin.active ? 'activated' : 'deactivated'}`, admin);
  } catch (error) {
    console.error('Error toggling admin status:', error);
    return errorResponse(res, error.message, 400);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Email and password are required', 400);
    }

    const admin = await service.authenticateAdmin(email, password);
    if (!admin) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return successResponse(res, 'Login successful', { admin, token });
  } catch (error) {
    console.error('Error during admin login:', error);
    return errorResponse(res, error.message, 500);
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return errorResponse(res, 'Password must be at least 8 characters', 400);
    }

    const admin = await service.changePassword(id, newPassword);
    if (!admin) {
      return errorResponse(res, 'Admin user not found', 404);
    }
    return successResponse(res, 'Password changed successfully');
  } catch (error) {
    console.error('Error changing password:', error);
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  getAdminUsers,
  getAdminUserById,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  toggleActive,
  adminLogin,
  changePassword
};
