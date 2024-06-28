const { StripeCancelSubscriptionService } = require('../../../../services/stripeCancelSubscriptionService/stripeCancelSubscriptionService');
const { StripeBaseWebhookSerializer } = require('./base');
require('dotenv').config();

class StripeSubscriptionCanceledActionSerializer extends StripeBaseWebhookSerializer {
    constructor(req) {
        super(req);
        this.event_type = 'customer.subscription.deleted';
        this.secret = process.env.STRIPE_SUBSCRIPTION_CANCELED_SIGNING_SECRET;
    }

    async handleWebhook(event) {
        let service = new StripeCancelSubscriptionService(event);

        try {
            const res = await service.do();
            return res;
        } catch (e) {
            console.log(e);
            return {
                error: {
                    message: `Something went wrong with service: ${e}`
                }
            }
        }
    }
}

module.exports = {
    StripeSubscriptionCanceledActionSerializer
}