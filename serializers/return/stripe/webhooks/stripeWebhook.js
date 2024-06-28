const { BaseReturnSerializer } = require("../../base/baseReturnSerializer");

class StripeWebhookReturnSerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            'message',
            'subscription',
            'cancelData'
        ]
    }
}

module.exports = {
    StripeWebhookReturnSerializer
}