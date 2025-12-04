/**
 * Crypto Utility
 * Provides encryption and decryption functions for API payloads
 */

const crypto = require('crypto');

// Algorithm and key settings
const ALGORITHM = 'aes-256-cbc';
// For AES-256-CBC, key must be exactly 32 characters
const DEFAULT_KEY = '12345678901234567890123456789012';
const KEY = process.env.ENCRYPTION_KEY || DEFAULT_KEY;
const IV_LENGTH = 16; // For AES, this is always 16 bytes

// Ensure key is exactly 32 bytes (256 bits) for AES-256
function getKeyBuffer() {
  let keyToUse = KEY;
  
  // If key is too short, pad it; if too long, truncate it
  if (keyToUse.length < 32) {
    keyToUse = keyToUse.padEnd(32, '0');
  } else if (keyToUse.length > 32) {
    keyToUse = keyToUse.substring(0, 32);
  }
  
  return Buffer.from(keyToUse);
}

/**
 * Encrypt data using AES-256-CBC
 * @param {Object|string} data - Data to encrypt
 * @returns {string} - Encrypted data as base64 string with IV
 */
const encryptPayload = (data) => {
  try {
    // Convert data to string if it's an object
    const dataString = typeof data === 'object' ? JSON.stringify(data) : String(data);
    
    // Generate a random initialization vector
    const iv = crypto.randomBytes(IV_LENGTH);
    
    // Get properly sized key buffer
    const keyBuffer = getKeyBuffer();
    
    // Create cipher with key and iv
    const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);
    
    // Encrypt the data
    let encrypted = cipher.update(dataString, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    // Combine IV and encrypted data and return as base64
    const result = {
      iv: iv.toString('base64'),
      data: encrypted
    };
    
    return Buffer.from(JSON.stringify(result)).toString('base64');
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt payload');
  }
};

/**
 * Decrypt data using AES-256-CBC
 * @param {string} encryptedData - Encrypted data as base64 string with IV
 * @returns {Object|string} - Decrypted data
 */
const decryptPayload = (encryptedData) => {
  try {
    // Skip decryption if data is not encrypted
    if (!encryptedData) {
      return {};
    }
    
    // Parse the combined IV and data
    const encryptedBuffer = Buffer.from(encryptedData, 'base64');
    const encryptedObject = JSON.parse(encryptedBuffer.toString());
    
    // Extract IV and encrypted content
    const iv = Buffer.from(encryptedObject.iv, 'base64');
    const encrypted = encryptedObject.data;
    
    // Get properly sized key buffer
    const keyBuffer = getKeyBuffer();
    
    // Create decipher with key and iv
    const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
    
    // Decrypt the data
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    // Try to parse as JSON, return as string if parsing fails
    try {
      return JSON.parse(decrypted);
    } catch (e) {
      return decrypted;
    }
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt payload');
  }
};

/**
 * Check if data is encrypted
 * @param {string} data - Data to check
 * @returns {boolean} - True if data appears to be encrypted
 */
const isEncrypted = (data) => {
  if (!data || typeof data !== 'string') {
    return false;
  }
  
  try {
    const decoded = Buffer.from(data, 'base64').toString();
    const parsed = JSON.parse(decoded);
    return parsed && parsed.iv && parsed.data;
  } catch (error) {
    return false;
  }
};

module.exports = {
  encryptPayload,
  decryptPayload,
  isEncrypted
};
