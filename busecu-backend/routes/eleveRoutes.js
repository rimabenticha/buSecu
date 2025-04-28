const express = require('express');
const router = express.Router();
const eleveController = require('../controllers/eleveController');

router.post('/add', eleveController.createEleve);
router.get('/', eleveController.getAllEleves);
router.put('/update/:id', eleveController.updateEleve);
router.delete('/delete/:id', eleveController.deleteEleve);

module.exports = router;