const { BaseReturnSerializer } = require("../base/baseReturnSerializer");

class UserSubscriptionInformationSerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            '_id',
            'subscriptionPlan',
            'suggestion_requests',
            'isRenewing',
            'currentPeriodEnd'
        ]
    }
}

module.exports = {
    UserSubscriptionInformationSerializer
}