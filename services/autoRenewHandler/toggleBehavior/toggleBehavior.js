require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class ToggleBehavior {
    constructor(config) {
        this.config = config;
    }

    async do() {
        const data = await this.toggle();
        return data;
    }

    async toggle() {
        throw new Error('toggle method not implemented');
    }
}

class SetAutoRenewBehavior extends ToggleBehavior {
    constructor(config) {
        super(config);
    }

    async toggle() {
        const stripe_id = this.config.subscription.stripe_id;
        const autoRenew = await this.config.autoRenew;
        console.log(autoRenew);
        
        const updateData = await stripe.subscriptions.update(stripe_id, {
            cancel_at_period_end: !autoRenew,
        });

        return {updateData}
    }
}

module.exports = {
    SetAutoRenewBehavior
}