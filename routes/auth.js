const express = require('express');
const { RegisterUserController } = require('../controllers/auth/registerUserController');
const router = express.Router();
require('dotenv').config()

const registerController = new RegisterUserController();
router.post(
    '/register', 
        async (req,res)=>{await registerController.do(req, res)}
    );

router.post(
    '/login', 
        async (req,res)=>{res.status(200).send('success')}
    );

module.exports = router;
