class MedicalData {
  constructor(patientId, symptoms, predictions) {
    this.patientId = patientId;
    this.symptoms = symptoms;
    this.predictions = predictions || [];
    this.encrypted = false;  // Flag for encryption
  }

  encrypt(key) {
    // Basic encryption placeholder (use crypto-js for real impl)
    this.encrypted = true;
    // Add encryption logic here later
  }

  toJSON() {
    return {
      patientId: this.patientId,
      symptoms: this.symptoms,
      predictions: this.predictions,
      encrypted: this.encrypted,
    };
  }
}

module.exports = MedicalData;
