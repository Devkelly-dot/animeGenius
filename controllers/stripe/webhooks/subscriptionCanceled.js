const { StripeSubscriptionCanceledActionSerializer } = require("../../../serializers/action/stripe/webhooks/subscriptionCanceled");
const { StripeWebhookReturnSerializer } = require("../../../serializers/return/stripe/webhooks/stripeWebhook");
const { BaseController } = require("../../base/base");

class StripeSubscriptionCanceledController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = StripeSubscriptionCanceledActionSerializer;
        this.returnSerializer = StripeWebhookReturnSerializer;
    }
}

module.exports = {
    StripeSubscriptionCanceledController
}