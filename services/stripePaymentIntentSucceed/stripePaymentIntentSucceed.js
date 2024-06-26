class StripePaymentIntentSucceedService { 
    constructor(event) {
        this.event = event;

        this.extractEventDataBehavior = null;
    }
}

module.exports = {
    StripePaymentIntentSucceedService
}