const SubscriptionPlan = require("../../../../db/models/SubscriptionPlan");

class DataFetcher {
    constructor(data) {
        this.data = data;
    }
    
    async do(){
        const data = await this.fetchData();
        return data;
    }

    async fetchData() {
        throw new Error("DataFetcher needs a fetchData method");
    }
}

class FetchIntentPlanData extends DataFetcher {
    constructor(data) {
        super(data);
    }

    async fetchData() {
        const intentPlan_id = this.data.intentPlan;
        if(!intentPlan_id) {
            throw new Error("FetchUserData needs an intentPlan_id property");
        }

        const intentPlan = await SubscriptionPlan.findOne({
            _id: intentPlan_id
        });

        if(!intentPlan) {
            return {
                error: {
                    code: 404,
                    message: "subscription plan was not found"
                }
            }
        }

        return {
            intentPlan: {
                stripe_id: intentPlan.price_monthly
            }
        }
    }
}

module.exports = {
    FetchIntentPlanData
}