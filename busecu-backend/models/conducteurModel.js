const mongoose = require('mongoose');

const conducteurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true,
    unique: true
  },
  joursTravail: {
    type: String,
    required: true,
    enum: ['lundi-mercredi', 'jeudi-samedi']
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Conducteur', conducteurSchema);