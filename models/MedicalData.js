const CryptoJS = require('crypto-js');
const config = require('../config/app');  // Import config for settings

class MedicalData {
  constructor(patientId, symptoms, predictions = []) {
    // Input validation to prevent errors
    if (!patientId || typeof patientId !== 'string') {
      throw new Error('Valid patient ID (string) required');
    }
    if (!symptoms || typeof symptoms !== 'string') {
      throw new Error('Valid symptoms (string) required');
    }
    if (!Array.isArray(predictions)) {
      throw new Error('Predictions must be an array');
    }

    this.patientId = patientId;
    this.symptoms = symptoms;
    this.predictions = predictions;
    this.encrypted = false;
    this.timestamp = new Date().toISOString();  // For audit logs
    this.auditLog = [];  // Track changes for compliance
  }

  // Add a prediction (integrates with AI)
  addPrediction(prediction) {
    if (!prediction || typeof prediction !== 'string') {
      throw new Error('Valid prediction (string) required');
    }
    this.predictions.push(prediction);
    this.auditLog.push({ action: 'added prediction', timestamp: new Date().toISOString() });
  }

  // Encrypt data for privacy (uses config key)
  encrypt() {
    if (this.encrypted) {
      throw new Error('Data already encrypted');
    }
    const key = config.encryptionKey;
    if (!key) {
      throw new Error('Encryption key not set in config');
    }
    this.encryptedData = CryptoJS.AES.encrypt(JSON.stringify({
      patientId: this.patientId,
      symptoms: this.symptoms,
      predictions: this.predictions,
      timestamp: this.timestamp,
    }), key).toString();
    this.encrypted = true;
    this.auditLog.push({ action: 'encrypted', timestamp: new Date().toISOString() });
  }

  // Decrypt if needed (for internal use)
  decrypt() {
    if (!this.encrypted) {
      throw new Error('Data not encrypted');
    }
    const key = config.encryptionKey;
    if (!key) {
      throw new Error('Encryption key not set in config');
    }
    try {
      const bytes = CryptoJS.AES.decrypt(this.encryptedData, key);
      const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      Object.assign(this, decrypted);
      this.encrypted = false;
      this.auditLog.push({ action: 'decrypted', timestamp: new Date().toISOString() });
    } catch (error) {
      throw new Error('Decryption failed - invalid key or data');
    }
  }

  // Convert to JSON (handles encrypted state)
  toJSON() {
    if (this.encrypted) {
      return {
        encryptedData: this.encryptedData,
        auditLog: this.auditLog,
      };
    }
    return {
      patientId: this.patientId,
      symptoms: this.symptoms,
      predictions: this.predictions,
      timestamp: this.timestamp,
      auditLog: this.auditLog,
    };
  }

  // Validate data size for performance
  validateSize() {
    const size = JSON.stringify(this.toJSON()).length;
    if (size > config.maxDataSize * 1024) {  // KB to bytes
      throw new Error(`Data exceeds max size (${config.maxDataSize} KB)`);
    }
  }
}

module.exports = MedicalData;
