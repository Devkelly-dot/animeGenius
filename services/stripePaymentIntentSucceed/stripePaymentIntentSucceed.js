const { ExtractSubscriptionDataFromEvent } = require("./behaviors/extractEventDataBehavior");
const { FindUserByStripeIdBehavior } = require("./behaviors/findUserData");
const { SubscriptionCreateWithService } = require("./behaviors/subscriptionCreateBehavior");

class StripePaymentIntentSucceedService { 
    constructor(event) {
        this.event = event;

        this.extractEventDataBehavior = ExtractSubscriptionDataFromEvent;
        this.findUserDataBehavior = FindUserByStripeIdBehavior;
        this.subscriptionCreationBehavior = SubscriptionCreateWithService;
    }

    async do() {
        let data = {event: this.event};
        const extractEventDataBehavior = new this.extractEventDataBehavior(this.event);
        const eventData = await extractEventDataBehavior.do();
        if(eventData.error) {
            return eventData;
        }

        data = {...data, ...eventData};
        const findUserDataBehavior = new this.findUserDataBehavior(data);
        const userData = await findUserDataBehavior.do();
        if(userData.error) {
            return userData;
        }

        data = {...data, ...userData};

        const subscriptionCreationBehavior = new this.subscriptionCreationBehavior(data);
        const subData = await subscriptionCreationBehavior.do();
        return {...data, ...subData};
    }
}

module.exports = {
    StripePaymentIntentSucceedService
}