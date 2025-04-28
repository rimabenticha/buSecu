const express = require('express');
const router = express.Router();
const trajetController = require('../controllers/trajetController');

router.post('/add', trajetController.createTrajet);
router.get('/', trajetController.getAllTrajets);
router.put('/update/:id', trajetController.updateTrajet);
router.delete('/delete/:id', trajetController.deleteTrajet);

module.exports = router;