const { StripePaymentIntentSucceedService } = require('../../../../services/stripePaymentIntentSucceed/stripePaymentIntentSucceed');
const { StripeBaseWebhookSerializer } = require('./base');
require('dotenv').config();

class StripePaymentIntentSucceedActionSerializer extends StripeBaseWebhookSerializer {
    constructor(req) {
        super(req);
        this.event_type = 'payment_intent.succeeded';
        this.secret = process.env.STRIPE_INTENT_SUCCEED_SIGNING_SECRET;
    }

    async handleWebhook(event) {
        const session = event.data.object;
        if(session?.description !== 'Subscription creation') {
            return {
                error: {
                    code: 200,
                    message: 'Webhook received. Was for renewal, not creation.'
                }
            }
        }

        let service = new StripePaymentIntentSucceedService(event);

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
    StripePaymentIntentSucceedActionSerializer
}