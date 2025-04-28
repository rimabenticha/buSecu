const mongoose = require('mongoose');

const trajetSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    enum: [1, 2]
  },
  arrets: {
    type: [String],
    required: true,
    enum: ['Centre Ville', 'Caffé', 'Nafoura', 'Rondpoint Lajmi']
  },
  heureDepart: {
    type: String,
    required: true,
    enum: ['7h', '17h']
  },
  heureArrivee: {
    type: String,
    required: true,
    enum: ['8h', '18h']
  }
}, { timestamps: true });

// Validation pour limiter à 2 trajets maximum
trajetSchema.pre('save', async function(next) {
  const count = await mongoose.model('Trajet').countDocuments();
  if (count >= 2 && this.isNew) {
    throw new Error('Maximum 2 trajets autorisés');
  }
  next();
});

module.exports = mongoose.model('Trajet', trajetSchema);