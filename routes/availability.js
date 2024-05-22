const express = require('express');
const { SearchAvailabilityController } = require('../controllers/availability/searchAvailability');
const router = express.Router();
require('dotenv').config();

const searchAvailabilityController = new SearchAvailabilityController();
router.get(
    '/search', 
        async (req,res)=>{await searchAvailabilityController.do(req, res)}
    );

module.exports = router;
