const { ResetSubscriptionPlanBehavior } = require("./behaviors/cancelSubscriptionBehavior");
const { ExtractSubscriptionFromStripeEvent } = require("./behaviors/fetchDataBehavior");

class StripeCancelSubscriptionService { 
    constructor(event) {
        this.event = event;
        
        this.fetchDataBehavior = ExtractSubscriptionFromStripeEvent;
        this.cancelBehavior = ResetSubscriptionPlanBehavior;
    }

    async do() {
        const fetchDataBehavior = new this.fetchDataBehavior(this.event);
        const data = await fetchDataBehavior.do();
        if(data.error) {
            return data;
        }

        const cancelBehavior = new this.cancelBehavior(data);
        const cancelData = await cancelBehavior.do();
        return cancelData;
    }
}

module.exports = {
    StripeCancelSubscriptionService
}