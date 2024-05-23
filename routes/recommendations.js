const express = require('express');
const { GetRecommendationsController } = require('../controllers/recommendations/getRecommendations');
const { RequiredAuthService } = require('../middleware/auth/auth');
const { GetUserSubscription } = require('../middleware/subscription/getSubscription');
const router = express.Router();
require('dotenv').config();
const requiredAuthService = new RequiredAuthService();
const getUserSubscription = new GetUserSubscription();

const getRecommendationsController = new GetRecommendationsController();
router.post(
    '/', 
        async (req,res,next)=>{await requiredAuthService.do(req, res, next)},
        async (req, res, next)=>{await getUserSubscription.do(req, res, next)},
        async (req,res)=>{await getRecommendationsController.do(req, res)}
    );

module.exports = router;
