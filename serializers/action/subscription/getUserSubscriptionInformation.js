const { BaseGetSerializer } = require("../base/crud/baseGetSerializer");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class GetUserSubscriptionInformationActionSerializer extends BaseGetSerializer {
    constructor(req) {
        super(req);
    }

    async get(verifiedParams) {
        const subscription = this.req.subscription;
        const stripe_subscription = await stripe.subscriptions.retrieve(subscription.stripe_id);
        const renew_data = {
            isRenewing: !stripe_subscription.cancel_at_period_end,
            currentPeriodEnd: stripe_subscription.current_period_end,
        };

        return {
            ...subscription?._doc,
            ...renew_data
        };
    }
}

module.exports = {
    GetUserSubscriptionInformationActionSerializer
}