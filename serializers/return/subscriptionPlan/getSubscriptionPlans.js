const { BaseReturnSerializer } = require("../base/baseReturnSerializer");

class GetSubscriptionPlansSerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            'subscriptionPlans'
        ]
    }
}

module.exports = {
    GetSubscriptionPlansSerializer
}