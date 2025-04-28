const Message = require('../models/Message');
const admin = require('firebase-admin'); // Si vous utilisez FCM


exports.sendMessageToParent = async (req, res) => {
    try {
      const { emailParent, message } = req.body;
  
      // 1. Trouver le device token du parent dans la base de données
      const parent = await Parent.findOne({ email: emailParent });
      if (!parent || !parent.deviceToken) {
        return res.status(404).json({ success: false, message: "Parent ou device token non trouvé" });
      }
  
      // 2. Enregistrer le message dans la base
      const newMessage = await Message.create({
        emailParent,
        message,
        isFromAdmin: true,
        nomEleve: parent.nomEleve // Optionnel
      });
  
      // 3. Envoyer la notification push via FCM
      const fcmMessage = {
        token: parent.deviceToken,
        notification: {
          title: "Nouveau message de l'école",
          body: message
        },
        data: { // Données supplémentaires
          messageId: newMessage._id.toString(),
          type: "admin_message"
        }
      };
  
      await admin.messaging().send(fcmMessage);
  
      res.status(200).json({ success: true, message: "Notification envoyée avec succès" });
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };



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
