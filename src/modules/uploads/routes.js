/**
 * Upload Module Routes
 * Handles file upload endpoints for all models
 * Based on Rails CarrierWave upload functionality
 */

const express = require('express');
const router = express.Router();
const { jwt, upload } = require('../../shared/middlewares');
const { User, Event, EventSession, Chapter, ChapterLead } = require('../../shared/models');

// ============================================
// User Avatar Upload
// ============================================

/**
 * Upload user avatar
 * POST /api/uploads/users/:id/avatar
 */
router.post(
  '/users/:id/avatar',
  jwt.verifyToken,
  upload.avatarUpload.single('avatar'),
  upload.handleUploadError,
  async (req, res) => {
    try {
      const { id } = req.params;
      
      // Verify user can only update their own avatar (or admin)
      if (req.user.id !== parseInt(id) && !req.user.admin) {
        return res.status(403).json({
          code: 'UPLOAD_AUTH_001',
          message: 'You can only update your own avatar',
          result: null
        });
      }

      if (!req.file) {
        return res.status(400).json({
          code: 'UPLOAD_001',
          message: 'No file uploaded',
          result: null
        });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          code: 'UPLOAD_002',
          message: 'User not found',
          result: null
        });
      }

      // Delete old avatar if exists
      if (user.avatar && !user.avatar.startsWith('http')) {
        await upload.deleteFile('user', 'avatar', id, user.avatar);
      }

      // Update user with new avatar filename
      await user.update({ avatar: req.file.filename });

      const avatarUrl = upload.getFileUrl('user', 'avatar', id, req.file.filename);

      res.json({
        code: 'UPLOAD_SUCCESS_001',
        message: 'Avatar uploaded successfully',
        result: {
          avatar: req.file.filename,
          avatar_url: avatarUrl
        }
      });
    } catch (error) {
      console.error('[Avatar Upload Error]:', error);
      res.status(500).json({
        code: 'UPLOAD_ERR_001',
        message: 'Failed to upload avatar',
        result: null
      });
    }
  }
);

/**
 * Delete user avatar
 * DELETE /api/uploads/users/:id/avatar
 */
router.delete(
  '/users/:id/avatar',
  jwt.verifyToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      
      if (req.user.id !== parseInt(id) && !req.user.admin) {
        return res.status(403).json({
          code: 'UPLOAD_AUTH_002',
          message: 'You can only delete your own avatar',
          result: null
        });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          code: 'UPLOAD_003',
          message: 'User not found',
          result: null
        });
      }

      if (user.avatar && !user.avatar.startsWith('http')) {
        await upload.deleteFile('user', 'avatar', id, user.avatar);
      }

      await user.update({ avatar: null });

      res.json({
        code: 'UPLOAD_SUCCESS_002',
        message: 'Avatar deleted successfully',
        result: null
      });
    } catch (error) {
      console.error('[Avatar Delete Error]:', error);
      res.status(500).json({
        code: 'UPLOAD_ERR_002',
        message: 'Failed to delete avatar',
        result: null
      });
    }
  }
);

// ============================================
// Event Image Upload
// ============================================

/**
 * Upload event image
 * POST /api/uploads/events/:id/image
 */
router.post(
  '/events/:id/image',
  jwt.verifyToken,
  upload.eventImageUpload.single('image'),
  upload.handleUploadError,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!req.file) {
        return res.status(400).json({
          code: 'UPLOAD_004',
          message: 'No file uploaded',
          result: null
        });
      }

      const event = await Event.findByPk(id);
      if (!event) {
        return res.status(404).json({
          code: 'UPLOAD_005',
          message: 'Event not found',
          result: null
        });
      }

      // Check if user is chapter lead for this event's chapter or admin
      const isLead = await ChapterLead.findOne({
        where: {
          user_id: req.user.id,
          chapter_id: event.chapter_id,
          active: true
        }
      });

      if (!isLead && !req.user.admin) {
        return res.status(403).json({
          code: 'UPLOAD_AUTH_005',
          message: 'Only chapter leads can upload event images',
          result: null
        });
      }

      // Delete old image if exists
      if (event.image && !event.image.startsWith('http')) {
        await upload.deleteFile('event', 'image', id, event.image);
      }

      await event.update({ image: req.file.filename });

      const imageUrl = upload.getFileUrl('event', 'image', id, req.file.filename);

      res.json({
        code: 'UPLOAD_SUCCESS_003',
        message: 'Event image uploaded successfully',
        result: {
          image: req.file.filename,
          image_url: imageUrl
        }
      });
    } catch (error) {
      console.error('[Event Image Upload Error]:', error);
      res.status(500).json({
        code: 'UPLOAD_ERR_003',
        message: 'Failed to upload event image',
        result: null
      });
    }
  }
);

/**
 * Delete event image
 * DELETE /api/uploads/events/:id/image
 */
router.delete(
  '/events/:id/image',
  jwt.verifyToken,
  async (req, res) => {
    try {
      const { id } = req.params;

      const event = await Event.findByPk(id);
      if (!event) {
        return res.status(404).json({
          code: 'UPLOAD_006',
          message: 'Event not found',
          result: null
        });
      }

      if (event.image && !event.image.startsWith('http')) {
        await upload.deleteFile('event', 'image', id, event.image);
      }

      await event.update({ image: null });

      res.json({
        code: 'UPLOAD_SUCCESS_004',
        message: 'Event image deleted successfully',
        result: null
      });
    } catch (error) {
      console.error('[Event Image Delete Error]:', error);
      res.status(500).json({
        code: 'UPLOAD_ERR_004',
        message: 'Failed to delete event image',
        result: null
      });
    }
  }
);

// ============================================
// Event Session Image Upload
// ============================================

/**
 * Upload session image
 * POST /api/uploads/sessions/:id/image
 */
router.post(
  '/sessions/:id/image',
  jwt.verifyToken,
  upload.sessionImageUpload.single('image'),
  upload.handleUploadError,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!req.file) {
        return res.status(400).json({
          code: 'UPLOAD_007',
          message: 'No file uploaded',
          result: null
        });
      }

      const session = await EventSession.findByPk(id);
      if (!session) {
        return res.status(404).json({
          code: 'UPLOAD_008',
          message: 'Session not found',
          result: null
        });
      }

      // Check if user is the speaker or admin
      if (session.user_id !== req.user.id && !req.user.admin) {
        return res.status(403).json({
          code: 'UPLOAD_AUTH_003',
          message: 'Only the speaker can upload session image',
          result: null
        });
      }

      // Delete old image if exists
      if (session.image && !session.image.startsWith('http')) {
        await upload.deleteFile('event_session', 'image', id, session.image);
      }

      await session.update({ image: req.file.filename });

      const imageUrl = upload.getFileUrl('event_session', 'image', id, req.file.filename);

      res.json({
        code: 'UPLOAD_SUCCESS_005',
        message: 'Session image uploaded successfully',
        result: {
          image: req.file.filename,
          image_url: imageUrl
        }
      });
    } catch (error) {
      console.error('[Session Image Upload Error]:', error);
      res.status(500).json({
        code: 'UPLOAD_ERR_005',
        message: 'Failed to upload session image',
        result: null
      });
    }
  }
);

/**
 * Delete session image
 * DELETE /api/uploads/sessions/:id/image
 */
router.delete(
  '/sessions/:id/image',
  jwt.verifyToken,
  async (req, res) => {
    try {
      const { id } = req.params;

      const session = await EventSession.findByPk(id);
      if (!session) {
        return res.status(404).json({
          code: 'UPLOAD_009',
          message: 'Session not found',
          result: null
        });
      }

      if (session.user_id !== req.user.id && !req.user.admin) {
        return res.status(403).json({
          code: 'UPLOAD_AUTH_004',
          message: 'Only the speaker can delete session image',
          result: null
        });
      }

      if (session.image && !session.image.startsWith('http')) {
        await upload.deleteFile('event_session', 'image', id, session.image);
      }

      await session.update({ image: null });

      res.json({
        code: 'UPLOAD_SUCCESS_006',
        message: 'Session image deleted successfully',
        result: null
      });
    } catch (error) {
      console.error('[Session Image Delete Error]:', error);
      res.status(500).json({
        code: 'UPLOAD_ERR_006',
        message: 'Failed to delete session image',
        result: null
      });
    }
  }
);

// ============================================
// Chapter Image Upload
// ============================================

/**
 * Upload chapter image
 * POST /api/uploads/chapters/:id/image
 */
router.post(
  '/chapters/:id/image',
  jwt.verifyToken,
  upload.chapterImageUpload.single('image'),
  upload.handleUploadError,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!req.file) {
        return res.status(400).json({
          code: 'UPLOAD_010',
          message: 'No file uploaded',
          result: null
        });
      }

      const chapter = await Chapter.findByPk(id);
      if (!chapter) {
        return res.status(404).json({
          code: 'UPLOAD_011',
          message: 'Chapter not found',
          result: null
        });
      }

      // Check if user is chapter lead or admin
      const isLead = await ChapterLead.findOne({
        where: {
          user_id: req.user.id,
          chapter_id: id,
          active: true
        }
      });

      if (!isLead && !req.user.admin) {
        return res.status(403).json({
          code: 'UPLOAD_AUTH_006',
          message: 'Only chapter leads can upload chapter images',
          result: null
        });
      }

      // Delete old image if exists
      if (chapter.image && !chapter.image.startsWith('http')) {
        await upload.deleteFile('chapter', 'image', id, chapter.image);
      }

      await chapter.update({ image: req.file.filename });

      const imageUrl = upload.getFileUrl('chapter', 'image', id, req.file.filename);

      res.json({
        code: 'UPLOAD_SUCCESS_007',
        message: 'Chapter image uploaded successfully',
        result: {
          image: req.file.filename,
          image_url: imageUrl
        }
      });
    } catch (error) {
      console.error('[Chapter Image Upload Error]:', error);
      res.status(500).json({
        code: 'UPLOAD_ERR_007',
        message: 'Failed to upload chapter image',
        result: null
      });
    }
  }
);

/**
 * Delete chapter image
 * DELETE /api/uploads/chapters/:id/image
 */
router.delete(
  '/chapters/:id/image',
  jwt.verifyToken,
  async (req, res) => {
    try {
      const { id } = req.params;

      const chapter = await Chapter.findByPk(id);
      if (!chapter) {
        return res.status(404).json({
          code: 'UPLOAD_012',
          message: 'Chapter not found',
          result: null
        });
      }

      if (chapter.image && !chapter.image.startsWith('http')) {
        await upload.deleteFile('chapter', 'image', id, chapter.image);
      }

      await chapter.update({ image: null });

      res.json({
        code: 'UPLOAD_SUCCESS_008',
        message: 'Chapter image deleted successfully',
        result: null
      });
    } catch (error) {
      console.error('[Chapter Image Delete Error]:', error);
      res.status(500).json({
        code: 'UPLOAD_ERR_008',
        message: 'Failed to delete chapter image',
        result: null
      });
    }
  }
);

module.exports = router;
