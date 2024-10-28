const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce');
const auth = require('../middleware/authorize');
const multer = require('../middleware/multer-config');

// Get all sauces
router.get('/', auth, sauceController.getAllSauces);

// Get a single sauce
router.get('/:id', auth, sauceController.getOneSauce);

// Add a new sauce
router.post('/', auth, multer, sauceController.createSauce);

// Modify an existing sauce
router.put('/:id', auth, multer, sauceController.modifySauce);

// Delete a sauce
router.delete('/:id', auth, sauceController.deleteSauce);

// Like or dislike a sauce
router.post('/:id/like', auth, sauceController.likeSauce);

// Route for adding a sauce with image upload
router.post('/', auth, multer, sauceController.createSauce);

// Other routes (delete, get sauces, etc.)
module.exports = router;