const express = require('express');
const { StripeCheckoutController } = require('../controllers/stripe/webhooks/paymentIntentSuccessful');
const router = express.Router();
require('dotenv').config();

const stripeCheckoutController = new StripeCheckoutController();
router.post(
    '/stripe/payment-intent-succeed', 
        async (req,res)=>{await stripeCheckoutController.do(req, res)}
    );

module.exports = router;
