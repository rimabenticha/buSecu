const express = require('express');
const router = express.Router();
const { createMessage } = require('../controllers/messageController');
const Message = require('../models/Message');

//router.post('/send', messageController.sendMessageToParent);
router.post('/', createMessage);
router.get('/', async (req, res) => {
    try {
      const messages = await Message.find().sort({ dateEnvoi: -1 }); // Derniers messages en premier
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });

module.exports = router;
