const Eleve = require('../models/eleveModel');

exports.createEleve = async (req, res) => {
  try {
    const eleve = new Eleve(req.body);
    await eleve.save();
    res.status(201).json(eleve);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllEleves = async (req, res) => {
  try {
    const eleves = await Eleve.find();
    res.status(200).json(eleves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEleve = async (req, res) => {
  try {
    const eleve = await Eleve.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true
    });
    if (!eleve) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }
    res.status(200).json(eleve);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEleve = async (req, res) => {
  try {
    const eleve = await Eleve.findByIdAndDelete(req.params.id);
    if (!eleve) {
      return res.status(404).json({ message: 'Élève non trouvé' });
    }
    res.status(200).json({ message: 'Élève supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};