const { StripePaymentIntentSucceedActionSerializer } = require("../../../serializers/action/stripe/webhooks/paymentIntentSucceed");
const { StripeWebhookReturnSerializer } = require("../../../serializers/return/stripe/webhooks/stripeWebhook");
const { BaseController } = require("../../base/base");

class StripeCheckoutController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = StripePaymentIntentSucceedActionSerializer;
        this.returnSerializer = StripeWebhookReturnSerializer;
    }
}

module.exports = {
    StripeCheckoutController
}