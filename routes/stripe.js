const express = require('express');
const { RequiredAuthService } = require('../middleware/auth/auth');
const { GetUserSubscription } = require('../middleware/subscription/getSubscription');
const { CreatePaymentIntentController } = require('../controllers/stripe/createPaymentIntent/createPaymentIntent');
const router = express.Router();
require('dotenv').config();
const requiredAuthService = new RequiredAuthService();
const getUserSubscription = new GetUserSubscription();

const createPaymentIntentController = new CreatePaymentIntentController();
// router.post(
//     '/payment-intent', 
//         async (req,res,next)=>{await requiredAuthService.do(req, res, next)},
//         async (req, res, next)=>{await getUserSubscription.do(req, res, next)},
//         async (req,res)=>{await createPaymentIntentController.do(req, res)}
//     );

module.exports = router;
