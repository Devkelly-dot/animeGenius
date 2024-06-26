const { BaseReturnSerializer } = require("../../base/baseReturnSerializer");

class PaymentIntentReturnSerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            'stripe_id',
            'intentData'
        ]
    }
}

module.exports = {
    PaymentIntentReturnSerializer
}