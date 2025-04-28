const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motdepasse: { type: String, required: true },
  nomeleve: { type: String, required: true }
});

module.exports = mongoose.model('Parent', parentSchema);
