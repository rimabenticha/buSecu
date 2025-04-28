const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const parentRoutes = require('./routes/parentRoutes');
const messageRoutes = require('./routes/messageRoutes');
const eleveRoutes = require('./routes/eleveRoutes');
const conducteurRoutes = require('./routes/conducteurRoutes');
const trajetRoutes = require('./routes/trajetRoutes');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/parents', parentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/eleves', eleveRoutes);
app.use('/api/conducteurs', conducteurRoutes);
app.use('/api/trajets', trajetRoutes);


// Route test
app.get('/', (req, res) => {
  res.send('API BuSecu running...');
});

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));

// Démarrage serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
