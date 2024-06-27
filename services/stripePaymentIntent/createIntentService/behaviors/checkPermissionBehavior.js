const SubscriptionPlan = require("../../../../db/models/SubscriptionPlan");
const { SubscriptionPlanTitles } = require("../../../../utils/enums/subscription");

class CheckPermissionBehavior {
    constructor(data) {
        this.data = data;
    }

    async do() {
        const permissionData = await this.check();
        return permissionData;
    }

    async check() {
        throw new Error("CheckPermissionBehavior needs a check method");
    }
}

class CheckUserHasNoSubscription extends CheckPermissionBehavior {
    constructor(data) {
        super(data);    
    }

    async check() {
        const subscription = this.data.subscription;
        if(!subscription) {
            throw new Error("CheckPermissionBehavior user needs a subscription property");
        }

        const freePlan = await SubscriptionPlan.findOne({title: SubscriptionPlanTitles.FREE});
        if(subscription.subscriptionPlan._id?.toString() !== freePlan._id.toString()) {
            return {
                error: {
                    code: 409,
                    message: "You already have a premium subscription plan"
                }
            }
        }

        return {};
    }
}

module.exports = {
    CheckUserHasNoSubscription
}