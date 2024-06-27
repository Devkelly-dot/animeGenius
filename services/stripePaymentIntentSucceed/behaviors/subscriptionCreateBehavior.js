const Subscription = require("../../../db/models/Subscription");
const SubscriptionPlan = require("../../../db/models/SubscriptionPlan");

class SubscriptionCreateBehavior {
    constructor(data) {
        this.data = data;
    }

    async do() {
        const subData = await this.create();
        return subData;
    }

    async create() {
        throw new Error("create() must be implemented in derived classes");
    }
}

class SubscriptionCreateWithService extends SubscriptionCreateBehavior {
    constructor(data) {
        super(data);
    }

    async create() {
        const user = this.data.user;
        const stripe_price_id = this.data.stripe_price_id;
        const subscriptionPlan = await SubscriptionPlan.findOne({
            price_monthly: stripe_price_id
        });

        const updateData = await Subscription.updateOne({
            _id: user.subscription._id
        }, {
            subscriptionPlan: subscriptionPlan._id,
            suggestion_requests: subscriptionPlan.includes.suggestion_requests
        });

        return {updateData};
    }
}

module.exports = {
    SubscriptionCreateWithService
}