const Parent = require('../models/Parent');
const bcrypt = require('bcryptjs');

// Admin Login (email et motdepasse fixés)
const adminLogin = (req, res) => {
  const { email, motdepasse } = req.body;
  if (email === 'admin@busecu.com' && motdepasse === 'admin123') {
    res.json({ message: 'Admin connecté' });
  } else {
    res.status(401).json({ message: 'Identifiants invalides' });
  }
};

// Ajouter un parent
const addParent = async (req, res) => {
  const { nom, prenom, email, motdepasse, nomeleve } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(motdepasse, 10);
    const newParent = new Parent({ nom, prenom, email, motdepasse: hashedPassword, nomeleve });
    await newParent.save();
    res.status(201).json(newParent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Modifier un parent
const updateParent = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, motdepasse, nomeleve } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(motdepasse, 10);
    const parent = await Parent.findByIdAndUpdate(id, { nom, prenom, email, motdepasse: hashedPassword, nomeleve }, { new: true });
    res.json(parent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un parent
const deleteParent = async (req, res) => {
  const { id } = req.params;
  try {
    await Parent.findByIdAndDelete(id);
    res.json({ message: 'Parent supprimé' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Parent Login
const parentLogin = async (req, res) => {
  const { email, motdepasse } = req.body;
  try {
    const parent = await Parent.findOne({ email });
    if (!parent) return res.status(404).json({ message: 'Parent non trouvé' });

    const isMatch = await bcrypt.compare(motdepasse, parent.motdepasse);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    res.json({ message: 'Parent connecté', parent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { adminLogin, addParent, updateParent, deleteParent, parentLogin };
