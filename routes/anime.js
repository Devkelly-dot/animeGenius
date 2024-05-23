const express = require('express');
const { FetchPopoularController } = require('../controllers/anime/fetchPopularController');
const passport = require('passport');
const { RequiredAuthService, OptionalAuthService } = require('../middleware/auth/auth');
const { SearchAnimeController } = require('../controllers/anime/searchAnime');
const { GetAnimeDetailsController } = require('../controllers/anime/getAnimeDetails');
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
    
const getAnimeDetailsController = new GetAnimeDetailsController();
router.get(
    '/search/:id', 
        async (req,res)=>{await getAnimeDetailsController.do(req, res)}
    );
module.exports = router;
