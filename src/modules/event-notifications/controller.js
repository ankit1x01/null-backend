/**
 * Event Notifications Controller
 */
const service = require('./services');
const { successResponse, errorResponse } = require('../../shared/utils/response');

/**
 * Get all notifications
 */
const getNotifications = async (req, res) => {
  try {
    const filters = {
      event_id: req.query.event_id,
      notification_type: req.query.notification_type,
      notification_state: req.query.notification_state
    };
    const notifications = await service.getAllNotifications(filters);
    return successResponse(res, 'Notifications retrieved successfully', notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get notification by ID
 */
const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await service.getNotificationById(id);
    if (!notification) {
      return errorResponse(res, 'Notification not found', 404);
    }
    return successResponse(res, 'Notification retrieved successfully', notification);
  } catch (error) {
    console.error('Error fetching notification:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Create notification
 */
const createNotification = async (req, res) => {
  try {
    const notification = await service.createNotification(req.body);
    return successResponse(res, 'Notification created successfully', notification, 201);
  } catch (error) {
    console.error('Error creating notification:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Schedule notifications for an event
 */
const scheduleEventNotifications = async (req, res) => {
  try {
    const { eventId } = req.params;
    const notifications = await service.scheduleEventNotifications(eventId);
    return successResponse(res, 'Notifications scheduled successfully', notifications, 201);
  } catch (error) {
    console.error('Error scheduling notifications:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Update notification
 */
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await service.updateNotification(id, req.body);
    if (!notification) {
      return errorResponse(res, 'Notification not found', 404);
    }
    return successResponse(res, 'Notification updated successfully', notification);
  } catch (error) {
    console.error('Error updating notification:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Delete notification
 */
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteNotification(id);
    if (!deleted) {
      return errorResponse(res, 'Notification not found', 404);
    }
    return successResponse(res, 'Notification deleted successfully');
  } catch (error) {
    console.error('Error deleting notification:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Process pending notifications
 */
const processPendingNotifications = async (req, res) => {
  try {
    const results = await service.processPendingNotifications();
    return successResponse(res, 'Pending notifications processed', results);
  } catch (error) {
    console.error('Error processing notifications:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Send a specific notification
 */
const sendNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await service.getNotificationById(id);
    if (!notification) {
      return errorResponse(res, 'Notification not found', 404);
    }
    const result = await service.sendNotification(notification);
    return successResponse(res, 'Notification sent successfully', result);
  } catch (error) {
    console.error('Error sending notification:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Get notifications by event
 */
const getNotificationsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const notifications = await service.getNotificationsByEvent(eventId);
    return successResponse(res, 'Event notifications retrieved', notifications);
  } catch (error) {
    console.error('Error fetching event notifications:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Cancel event notifications
 */
const cancelEventNotifications = async (req, res) => {
  try {
    const { eventId } = req.params;
    const result = await service.cancelEventNotifications(eventId);
    return successResponse(res, 'Event notifications cancelled', { updated: result[0] });
  } catch (error) {
    console.error('Error cancelling notifications:', error);
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  getNotifications,
  getNotificationById,
  createNotification,
  scheduleEventNotifications,
  updateNotification,
  deleteNotification,
  processPendingNotifications,
  sendNotification,
  getNotificationsByEvent,
  cancelEventNotifications
};
