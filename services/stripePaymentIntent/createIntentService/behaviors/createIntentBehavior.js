require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class CreateIntentBehavior {
    constructor(data) {
        this.data = data;
    }

    async do() {
        const intent = await this.create();
        return intent;
    }

    async create() {
        throw new Error('create method not implemented');
    }
}

class CreateStripeIntentFromUser extends CreateIntentBehavior {
    constructor(data) {
        super(data);
    }

    async create() {
        const stripe_id_user = this.data.stripe_id;
        const stripe_id_sub = this.data.intentPlan.stripe_id;
        const stripeSubscription = await stripe.subscriptions.create({
            customer: stripe_id_user,
            items: [{
                price: stripe_id_sub,
            }],
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent'],
        });

        return {
            stripeSubscription
        }
    }
}

module.exports = {
    CreateStripeIntentFromUser
}