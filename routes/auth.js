const express = require('express');
const { RegisterUserController } = require('../controllers/auth/registerUserController');
const { LoginWithEmailPassController } = require('../controllers/auth/loginWithEmailPassController');
const { DeleteAccountController } = require('../controllers/auth/deleteAccountController');
const { RequiredAuthService } = require('../middleware/auth/auth');
const router = express.Router();
require('dotenv').config()
const requiredAuthService = new RequiredAuthService();

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

const deleteController = new DeleteAccountController();
router.post(
    '/delete', 
        async (req,res,next)=>{await requiredAuthService.do(req, res, next)},
        async (req,res)=>{await deleteController.do(req, res)}
    );
module.exports = router;
