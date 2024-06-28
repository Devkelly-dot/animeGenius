const { GetSubscriptionPlansActionSerializer } = require("../../serializers/action/subscriptionPlan/getSubscriptionPlans");
const { GetSubscriptionPlansSerializer } = require("../../serializers/return/subscriptionPlan/getSubscriptionPlans");
const { BaseController } = require("../base/base");

class GetSubscriptionPlansController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = GetSubscriptionPlansActionSerializer;
        this.returnSerializer = GetSubscriptionPlansSerializer;
    }
}

module.exports = {
    GetSubscriptionPlansController
}