const Subscription = require("../../../db/models/Subscription");
const SubscriptionPlan = require("../../../db/models/SubscriptionPlan");
const { SubscriptionPlanTitles } = require("../../../utils/enums/subscription");

class CancelSubscriptionBehavior {
    constructor(data) {
        this.data = data;
    }

    async do() {
        const data = await this.cancel();
        return data;
    }

    async cancel() {
        throw new Error("cancel Method not implemented");
    }
}

class ResetSubscriptionPlanBehavior extends CancelSubscriptionBehavior {
    constructor(data) {
        super(data);
    }

    async cancel() {
        const freeSubscriptionPlan = await SubscriptionPlan.findOne({
            title: SubscriptionPlanTitles.FREE
        });

        console.log(this.data);
        const subscription = this.data.user_subscription;
        const cancelData = await Subscription.updateOne({
            _id: subscription._id
        }, {
            suggestion_requests: freeSubscriptionPlan.includes.suggestion_requests
        });

        return {
            subscription,
            cancelData
        }
    }
}

module.exports = {
    ResetSubscriptionPlanBehavior
}