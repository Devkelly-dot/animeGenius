const { StripePaymentIntentCreator } = require("./createIntentService/stripePaymentIntentCreator")

class StripePaymentIntent {
    constructor() {
        this.intentCreator = StripePaymentIntentCreator;
        this.successfulIntentHandler = null;
    }

    async createIntent(user) {
        const intentCreator = new this.intentCreator(user);
        const intent = await intentCreator.do();
        return intent;
    }

    async handleSuccessfulIntent(session) {
        const successfulIntentHandler = new this.successfulIntentHandler(session);
        const res = await successfulIntentHandler.do();
        return res;
    }
}

module.exports = {
    StripePaymentIntent
}