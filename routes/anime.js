const express = require('express');
const { FetchPopoularController } = require('../controllers/anime/fetchPopularController');
const passport = require('passport');
const { RequiredAuthService, OptionalAuthService } = require('../middleware/auth/auth');
const router = express.Router();
require('dotenv').config();

const requiredAuthService = new RequiredAuthService();
const optionalAuthService = new OptionalAuthService();

const fetchPopoularController = new FetchPopoularController();
router.get(
    '/popular', 
        async (req,res,next)=>{await optionalAuthService.do(req, res, next)},
        async (req,res)=>{await fetchPopoularController.do(req, res)}
    );

module.exports = router;
