const Subscription = require("../../../db/models/Subscription");

class FetchDataBehavior {
    constructor(event) {
        this.event = event;
    }

    async do() {
        const data = await this.fetch();
        return data;
    }

    async fetch() {
        throw new Error("fetch() must be implemented in derived classes");
    }
}

class ExtractSubscriptionFromStripeEvent extends FetchDataBehavior {
    constructor(event) {
        super(event);
    }

    async fetch() {
        const stripe_subscription = this.event.data.object;
        if(stripe_subscription.id) {
            const user_subscription = await Subscription.findOne({
                stripe_id: stripe_subscription.id
            });

            return {
                user_subscription
            }
        }

        return {
            error: {
                code: 404,
                message: 'No subscription id found in event'
            }
        }
    }
}

module.exports = {
    ExtractSubscriptionFromStripeEvent
}