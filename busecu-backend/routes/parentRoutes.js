const express = require('express');
const router = express.Router();
const { adminLogin, addParent, updateParent, deleteParent, parentLogin } = require('../controllers/parentController');
const Parent = require('../models/Parent');

router.get('/', async (req, res) => {
    try {
      const parents = await Parent.find();
      res.json(parents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.post('/admin-login', adminLogin);
router.post('/add', addParent);
router.put('/update/:id', updateParent);
router.delete('/delete/:id', deleteParent);
router.post('/login', parentLogin);

module.exports = router;
