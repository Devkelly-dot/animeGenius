const SubscriptionPlan = require("../../db/models/SubscriptionPlan");
const { plans } = require("./data/plans");

class CreateSubscriptionPlans {
    constructor() {

    }


    async do() {
        for (let i = 0; i < plans.length; i++) {
            const plan = plans[i];
            const existingPlan = await SubscriptionPlan.findOne({ title: plan.title });
            if (!existingPlan) {
                const subscriptionPlan = await new SubscriptionPlan(plan).save();
                console.log(`Created subscription plan: ${subscriptionPlan.title}`);
            } else {
                console.log(`Plan already exists: ${existingPlan.title}`);
            }
        }
    }
}

module.exports = {
    CreateSubscriptionPlans
}