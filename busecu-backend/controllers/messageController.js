const Message = require('../models/Message');
//const admin = require('firebase-admin'); // Si vous utilisez FCM





exports.getAllMessages = async (req, res) => {
    try {
      const messages = await Message.find().sort({ createdAt: -1 });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const createMessage = async (req, res) => {
  try {
    const { childName, message, parentEmail } = req.body;

    const newMessage = new Message({
      childName,
      message,
      parentEmail
    });

    await newMessage.save();
    res.status(200).json({ message: 'Message enregistré avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du message :', error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement du message' });
  }
};

module.exports = { createMessage };
