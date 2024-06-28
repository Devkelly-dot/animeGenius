const express = require('express');
const { RequiredAuthService } = require('../middleware/auth/auth');
const { GetUserSubscription } = require('../middleware/subscription/getSubscription');
const { GetSubscriptionInformationController } = require('../controllers/subscription/subscriptionInformation');
const { AutoRenewController } = require('../controllers/subscription/autoRenew');
const router = express.Router();
require('dotenv').config();
const requiredAuthService = new RequiredAuthService();
const getUserSubscription = new GetUserSubscription();

const getSubscriptionInformation = new GetSubscriptionInformationController();
router.get(
    '/', 
        async (req,res,next)=>{await requiredAuthService.do(req, res, next)},
        async (req, res, next)=>{await getUserSubscription.do(req, res, next)},
        async (req,res)=>{await getSubscriptionInformation.do(req, res)}
    );

const autoRenewController = new AutoRenewController();
router.post(
    '/auto-renew', 
        async (req,res,next)=>{await requiredAuthService.do(req, res, next)},
        async (req, res, next)=>{await getUserSubscription.do(req, res, next)},
        async (req,res)=>{await autoRenewController.do(req, res)}
    );
    
module.exports = router;
