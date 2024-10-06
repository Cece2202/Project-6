const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauceController');
const authorize = require('../middleware/authorize');
const multer = require('../middleware/multer-config');

// Route for adding a sauce with image upload
router.post('/', authorize, multer, sauceController.createSauce);

// Other routes (delete, get sauces, etc.)
module.exports = router;