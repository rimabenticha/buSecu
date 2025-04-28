const Conducteur = require('../models/conducteurModel');

exports.createConducteur = async (req, res) => {
  try {
    // Vérification du nombre de conducteurs
    const count = await Conducteur.countDocuments();
    if (count >= 2) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 2 conducteurs autorisés'
      });
    }

    const conducteur = new Conducteur(req.body);
    await conducteur.save();
    res.status(201).json({
      success: true,
      data: conducteur
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllConducteurs = async (req, res) => {
  try {
    const conducteurs = await Conducteur.find();
    res.status(200).json({
      success: true,
      count: conducteurs.length,
      data: conducteurs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateConducteur = async (req, res) => {
  try {
    const conducteur = await Conducteur.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!conducteur) {
      return res.status(404).json({
        success: false,
        message: 'Conducteur non trouvé'
      });
    }
    res.status(200).json({
      success: true,
      data: conducteur
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteConducteur = async (req, res) => {
  try {
    const conducteur = await Conducteur.findByIdAndDelete(req.params.id);
    if (!conducteur) {
      return res.status(404).json({
        success: false,
        message: 'Conducteur non trouvé'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Conducteur supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};