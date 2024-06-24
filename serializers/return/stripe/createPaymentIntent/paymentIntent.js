const { BaseReturnSerializer } = require("../../base/baseReturnSerializer");

class PaymentIntentReturnSerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            'subscriptionId',
            'clientSecret',
            'user_stripe_id',
            'user_email',
            'verifiedFields'
        ]
    }
}

module.exports = {
    PaymentIntentReturnSerializer
}