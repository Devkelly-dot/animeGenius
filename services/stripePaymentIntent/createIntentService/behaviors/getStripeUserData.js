require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class GetStripeUserBehavior {
    constructor(data) {
        this.data = data;
    }

    async do() {
        const stripeUser = await this.getStripeUser();
        return stripeUser;
    }

    async getStripeUser() {
        throw new Error('getStripeUser method not implemented');
    }
}

class GetOrCreateStripeUserBehavior extends GetStripeUserBehavior {
    constructor(data) {
        super(data);
    }

    async getStripeUser() {
        const user = this.data.user;
        let stripe_id = user.stripe_id;

        if(!stripe_id) {
            const newStripeUser = await stripe.customers.create({
                email: user.email,
            });
            stripe_id = newStripeUser.id;
        }

        return {stripe_id};
    }
}

module.exports = {
    GetOrCreateStripeUserBehavior
}