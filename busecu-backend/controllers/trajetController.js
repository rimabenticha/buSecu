const Trajet = require('../models/trajetModel');

exports.createTrajet = async (req, res) => {
  try {
    // Vérification supplémentaire de la limite
    const count = await Trajet.countDocuments();
    if (count >= 2) {
      return res.status(400).json({ 
        success: false,
        message: 'Maximum 2 trajets autorisés' 
      });
    }

    const trajet = new Trajet(req.body);
    await trajet.save();
    res.status(201).json({ success: true, data: trajet });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllTrajets = async (req, res) => {
  try {
    const trajets = await Trajet.find().sort('id');
    res.status(200).json({ success: true, data: trajets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTrajet = async (req, res) => {
  try {
    const trajet = await Trajet.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!trajet) {
      return res.status(404).json({ success: false, message: 'Trajet non trouvé' });
    }
    res.status(200).json({ success: true, data: trajet });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteTrajet = async (req, res) => {
  try {
    const trajet = await Trajet.findOneAndDelete({ id: req.params.id });
    if (!trajet) {
      return res.status(404).json({ success: false, message: 'Trajet non trouvé' });
    }
    res.status(200).json({ success: true, message: 'Trajet supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};