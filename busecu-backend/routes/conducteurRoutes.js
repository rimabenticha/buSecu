const express = require('express');
const router = express.Router();
const conducteurController = require('../controllers/conducteurController');

router.post('/add', conducteurController.createConducteur);
router.get('/', conducteurController.getAllConducteurs);
router.put('/update/:id', conducteurController.updateConducteur);
router.delete('/delete/:id', conducteurController.deleteConducteur);

module.exports = router;