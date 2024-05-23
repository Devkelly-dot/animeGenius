const Subscription = require("../../../db/models/Subscription");
const SubscriptionPlan = require("../../../db/models/SubscriptionPlan");

class ResetBehavior {
    constructor() {
    }

    async do() {
        await this.reset();
    }

    async reset() {
        throw new Error("ResetBehavior reset Method not implemented");
    }
}

class ResetAllSubs extends ResetBehavior {
    constructor() {
        super();
    }

    async reset() {
        const subscriptionPlans = await SubscriptionPlan.find({});
        for(let i = 0; i < subscriptionPlans.length; i++) {
            const subscriptionPlan = subscriptionPlans[i];
            const subPlan_id = subscriptionPlan._id;
            const suggestion_requests = subscriptionPlan.includes.suggestion_requests;
            await Subscription.updateMany({
                subscriptionPlan: subPlan_id
            }, {
                suggestion_requests: suggestion_requests
            });

            console.log(`${subscriptionPlan.title} subscriptions reset`);
        }
    }
}

module.exports = {
    ResetAllSubs
}