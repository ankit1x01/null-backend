/**
 * Event Notifications Services
 * STUBBED: Feature not available in current schema
 */

class EventNotificationService {
  async getAllNotifications(filters = {}) { return []; }
  async getNotificationById(id) { return null; }
  async createNotification(data) { throw new Error('Not supported'); }
  async scheduleEventNotifications(eventId) { console.warn('Notification scheduling skipped (Not supported)'); return []; }
  async updateNotification(id, data) { return null; }
  async deleteNotification(id) { return false; }
  async processPendingNotifications() { return []; }
  async sendNotification(notification) { return null; }
  async getNotificationsByEvent(eventId) { return []; }
  async cancelEventNotifications(eventId) { return [0]; }
}

module.exports = new EventNotificationService();
