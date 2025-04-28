const mongoose = require('mongoose');

const eleveSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  niveau: {
    type: String,
    required: true
  },
  emailParent: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Eleve', eleveSchema);