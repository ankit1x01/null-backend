/**
 * File Upload Middleware
 * Handles file uploads using multer
 * Based on Rails CarrierWave configuration
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Configuration from environment
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024; // 5MB default

// Allowed file types per upload type (matching Rails CarrierWave whitelist)
const ALLOWED_TYPES = {
  avatar: {
    mimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
    extensions: ['.jpg', '.jpeg', '.png', '.gif'],
    maxSize: 2 * 1024 * 1024 // 2MB for avatars
  },
  image: {
    mimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
    extensions: ['.jpg', '.jpeg', '.png', '.gif'],
    maxSize: MAX_FILE_SIZE
  },
  document: {
    mimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    extensions: ['.pdf', '.doc', '.docx'],
    maxSize: 10 * 1024 * 1024 // 10MB for documents
  }
};

/**
 * Ensure upload directory exists
 * @param {string} dir - Directory path
 */
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

/**
 * Generate unique filename
 * @param {string} originalname - Original filename
 * @returns {string} - Unique filename
 */
const generateFilename = (originalname) => {
  const ext = path.extname(originalname).toLowerCase();
  const uniqueSuffix = crypto.randomBytes(16).toString('hex');
  return `${Date.now()}-${uniqueSuffix}${ext}`;
};

/**
 * Create storage configuration
 * Mimics Rails CarrierWave store_dir: uploads/{model}/{mounted_as}/{id}
 * @param {string} model - Model name (user, event, chapter, etc.)
 * @param {string} field - Field name (avatar, image, etc.)
 */
const createStorage = (model, field) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      // Get ID from params or body
      const id = req.params.id || req.body.id || 'temp';
      const uploadPath = path.join(UPLOAD_DIR, model, field, String(id));
      ensureDir(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, generateFilename(file.originalname));
    }
  });
};

/**
 * Create file filter based on upload type
 * @param {string} uploadType - Type of upload (avatar, image, document)
 */
const createFileFilter = (uploadType) => {
  const config = ALLOWED_TYPES[uploadType] || ALLOWED_TYPES.image;
  
  return (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;

    // Check extension
    if (!config.extensions.includes(ext)) {
      return cb(new Error(`Invalid file extension. Allowed: ${config.extensions.join(', ')}`), false);
    }

    // Check MIME type
    if (!config.mimeTypes.includes(mimeType)) {
      return cb(new Error(`Invalid file type. Allowed: ${config.mimeTypes.join(', ')}`), false);
    }

    cb(null, true);
  };
};

/**
 * Error handler for multer errors
 */
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        code: 'UPLOAD_ERROR_001',
        message: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
        result: null
      });
    }
    return res.status(400).json({
      code: 'UPLOAD_ERROR_002',
      message: err.message,
      result: null
    });
  }
  
  if (err) {
    return res.status(400).json({
      code: 'UPLOAD_ERROR_003',
      message: err.message,
      result: null
    });
  }
  
  next();
};

// ============================================
// Pre-configured Upload Middlewares
// ============================================

/**
 * User Avatar Upload
 * Rails equivalent: mount_uploader :avatar, AvatarUploader
 */
const avatarUpload = multer({
  storage: createStorage('user', 'avatar'),
  fileFilter: createFileFilter('avatar'),
  limits: {
    fileSize: ALLOWED_TYPES.avatar.maxSize
  }
});

/**
 * Event Image Upload
 * Rails equivalent: mount_uploader :image, ImageUploader (Event model)
 */
const eventImageUpload = multer({
  storage: createStorage('event', 'image'),
  fileFilter: createFileFilter('image'),
  limits: {
    fileSize: ALLOWED_TYPES.image.maxSize
  }
});

/**
 * Event Session Image Upload
 * Rails equivalent: mount_uploader :image, ImageUploader (EventSession model)
 */
const sessionImageUpload = multer({
  storage: createStorage('event_session', 'image'),
  fileFilter: createFileFilter('image'),
  limits: {
    fileSize: ALLOWED_TYPES.image.maxSize
  }
});

/**
 * Chapter Image Upload
 * Rails equivalent: mount_uploader :image, ChapterImageUploader
 */
const chapterImageUpload = multer({
  storage: createStorage('chapter', 'image'),
  fileFilter: createFileFilter('image'),
  limits: {
    fileSize: ALLOWED_TYPES.image.maxSize
  }
});

/**
 * Generic Image Upload (for any model)
 * @param {string} model - Model name
 */
const createImageUpload = (model) => {
  return multer({
    storage: createStorage(model, 'image'),
    fileFilter: createFileFilter('image'),
    limits: {
      fileSize: ALLOWED_TYPES.image.maxSize
    }
  });
};

/**
 * Get the public URL for an uploaded file
 * @param {string} model - Model name
 * @param {string} field - Field name
 * @param {string|number} id - Record ID
 * @param {string} filename - Filename
 * @returns {string} - Public URL
 */
const getFileUrl = (model, field, id, filename) => {
  if (!filename) return null;
  // If it's already a full URL (e.g., from OAuth or gravatar)
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3001}`;
  return `${baseUrl}/uploads/${model}/${field}/${id}/${filename}`;
};

/**
 * Delete uploaded file
 * @param {string} model - Model name
 * @param {string} field - Field name
 * @param {string|number} id - Record ID
 * @param {string} filename - Filename to delete
 */
const deleteFile = async (model, field, id, filename) => {
  if (!filename || filename.startsWith('http')) return;
  
  const filePath = path.join(UPLOAD_DIR, model, field, String(id), filename);
  
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`[Upload] Deleted file: ${filePath}`);
    }
  } catch (error) {
    console.error(`[Upload] Failed to delete file: ${filePath}`, error);
  }
};

/**
 * Move file from temp to permanent location
 * @param {string} tempPath - Temporary file path
 * @param {string} model - Model name
 * @param {string} field - Field name
 * @param {string|number} id - Record ID
 */
const moveFromTemp = async (tempPath, model, field, id) => {
  const filename = path.basename(tempPath);
  const destDir = path.join(UPLOAD_DIR, model, field, String(id));
  const destPath = path.join(destDir, filename);
  
  ensureDir(destDir);
  
  try {
    fs.renameSync(tempPath, destPath);
    return filename;
  } catch (error) {
    // If rename fails (cross-device), copy and delete
    fs.copyFileSync(tempPath, destPath);
    fs.unlinkSync(tempPath);
    return filename;
  }
};

module.exports = {
  // Pre-configured uploaders
  avatarUpload,
  eventImageUpload,
  sessionImageUpload,
  chapterImageUpload,
  
  // Factory function
  createImageUpload,
  
  // Utilities
  getFileUrl,
  deleteFile,
  moveFromTemp,
  handleUploadError,
  
  // Configuration
  ALLOWED_TYPES,
  UPLOAD_DIR,
  MAX_FILE_SIZE
};
