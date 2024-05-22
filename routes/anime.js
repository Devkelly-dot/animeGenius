const express = require('express');
const { FetchPopoularController } = require('../controllers/anime/fetchPopularController');
const passport = require('passport');
const { RequiredAuthService, OptionalAuthService } = require('../middleware/auth/auth');
const { SearchAnimeController } = require('../controllers/anime/searchAnime');
const router = express.Router();
require('dotenv').config();

const requiredAuthService = new RequiredAuthService();
const optionalAuthService = new OptionalAuthService();

const fetchPopoularController = new FetchPopoularController();
router.get(
    '/popular', 
        async (req,res)=>{await fetchPopoularController.do(req, res)}
    );

const searchAnimeController = new SearchAnimeController();
router.get(
    '/search', 
        async (req,res)=>{await searchAnimeController.do(req, res)}
    );
    
module.exports = router;
