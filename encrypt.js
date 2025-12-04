const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

function encryptPayload(data) {
  const ALGORITHM = 'aes-256-cbc';
  const KEY = '12345678901234567890123456789012'; // Exactly 32 characters for AES-256
  const IV_LENGTH = 16;
  
  const iv = crypto.randomBytes(IV_LENGTH);
  const keyBuffer = Buffer.from(KEY);
  const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);
  
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  const result = {
    iv: iv.toString('base64'),
    data: encrypted
  };
  
  return Buffer.from(JSON.stringify(result)).toString('base64');
}

const loginData = {
    email: "dhiraj+1@endl.app",
    password: "dhiraj@1234",
};

const encryptedPayload = {
  encrypted: encryptPayload(loginData)
};

console.log("Encrypted payload to send:");
console.log(JSON.stringify(encryptedPayload, null, 2));
