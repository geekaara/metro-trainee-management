const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Handle user login on POST.
router.post('/login', userController.user_login_post);

// Handle user register on POST.
router.post('/register', userController.user_signup_post);


module.exports = router;
