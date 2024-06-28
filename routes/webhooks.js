const express = require('express');
const { StripeCheckoutController } = require('../controllers/stripe/webhooks/paymentIntentSuccessful');
const { StripeSubscriptionCanceledController } = require('../controllers/stripe/webhooks/subscriptionCanceled');
const router = express.Router();
require('dotenv').config();

const stripeCheckoutController = new StripeCheckoutController();
router.post(
    '/stripe/payment-intent-succeed', 
        express.raw({type: "application/json"}),
        async (req,res)=>{await stripeCheckoutController.do(req, res)}
    );

const stripeSubscriptionCanceledController = new StripeSubscriptionCanceledController();
router.post(
    '/stripe/subscription-canceled', 
        express.raw({type: "application/json"}),
        async (req,res)=>{await stripeSubscriptionCanceledController.do(req, res)}
    );

module.exports = router;
