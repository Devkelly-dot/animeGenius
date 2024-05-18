const express = require('express');
const router = express.Router();
require('dotenv').config()

router.post(
    '/register', 
        async (req,res)=>{res.status(200).send('success')}
    );

router.post(
    '/login', 
        async (req,res)=>{res.status(200).send('success')}
    );

module.exports = router;
