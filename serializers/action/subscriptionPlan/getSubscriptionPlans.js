const SubscriptionPlan = require("../../../db/models/SubscriptionPlan");
const { BaseGetSerializer } = require("../base/crud/baseGetSerializer");
require('dotenv').config();

class GetSubscriptionPlansActionSerializer extends BaseGetSerializer {
    constructor(req) {
        super(req);
    }

    async get(verifiedParams) {
        const subscriptionPlans = await SubscriptionPlan.find({});
        return {
            subscriptionPlans
        }
    }
}

module.exports = {
    GetSubscriptionPlansActionSerializer
}