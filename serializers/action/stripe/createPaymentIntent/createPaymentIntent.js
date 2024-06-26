const { StripePaymentIntentCreator } = require("../../../../services/stripePaymentIntent/createIntentService/stripePaymentIntentCreator");
const { BasePostSerializer } = require("../../base/crud/basePostSerializer");

class CreatePaymentIntentActionSerializer extends BasePostSerializer {
    constructor(req) {
        super(req);

        this.required_fields = [
            'intentPlan',
        ];
    }

    async post(verifiedFields) {
        verifiedFields.user = this.req.user;
        verifiedFields.subscription = this.req.subscription;
        const stripePaymentIntentCreator = new StripePaymentIntentCreator(verifiedFields);
        const data = await stripePaymentIntentCreator.do();
        return data;
    }
}

module.exports = {
    CreatePaymentIntentActionSerializer
}