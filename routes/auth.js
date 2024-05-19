const express = require('express');
const { RegisterUserController } = require('../controllers/auth/registerUserController');
const { LoginWithEmailPassController } = require('../controllers/auth/loginWithEmailPassController');
const router = express.Router();
require('dotenv').config()

const registerController = new RegisterUserController();
router.post(
    '/register', 
        async (req,res)=>{await registerController.do(req, res)}
    );

const loginWithEmailPassController = new LoginWithEmailPassController();
router.post(
    '/login', 
        async (req,res)=>{await loginWithEmailPassController.do(req, res)}
    );

module.exports = router;
