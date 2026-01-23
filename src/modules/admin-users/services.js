/**
 * Admin Users Services
 */
const db = require('../../shared/models');
const bcrypt = require('bcrypt');

class AdminUserService {
  async getAllAdminUsers() {
    return await db.AdminUser.findAll({
      order: [['created_at', 'DESC']]
    });
  }

  async getAdminUserById(id) {
    return await db.AdminUser.findByPk(id);
  }

  async getAdminUserByEmail(email) {
    return await db.AdminUser.findOne({ where: { email } });
  }

  async createAdminUser(data) {
    return await db.AdminUser.create({
      ...data,
      encrypted_password: data.password
    });
  }

  async updateAdminUser(id, data) {
    const admin = await db.AdminUser.findByPk(id);
    if (!admin) return null;

    const updateData = { ...data };
    if (data.password) {
      updateData.encrypted_password = data.password;
      delete updateData.password;
    }

    await admin.update(updateData);
    return admin;
  }

  async deleteAdminUser(id) {
    const admin = await db.AdminUser.findByPk(id);
    if (!admin) return false;
    await admin.destroy();
    return true;
  }

  async authenticateAdmin(email, password) {
    const admin = await db.AdminUser.findOne({ where: { email } });
    if (!admin) return null;

    const isValid = await admin.validatePassword(password);
    if (!isValid) return null;

    // Update sign-in tracking
    await admin.update({
      sign_in_count: admin.sign_in_count + 1,
      last_sign_in_at: admin.current_sign_in_at,
      current_sign_in_at: new Date()
    });

    return admin;
  }

  async toggleActive(id) {
    // Feature disabled as 'active' column does not exist
    const admin = await db.AdminUser.findByPk(id);
    return admin;
  }

  async changePassword(id, newPassword) {
    const admin = await db.AdminUser.findByPk(id);
    if (!admin) return null;
    await admin.update({ encrypted_password: newPassword });
    return admin;
  }
}

module.exports = new AdminUserService();
