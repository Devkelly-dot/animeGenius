class ExtractEventDataBehavior {
    constructor(event) {
        this.event = event;
    }

    async do() {
        const data = await this.extract();
        return data;
    }

    async extract() {
        throw new Error("extract() must be implemented in derived classes");
    }
}

class ExtractSubscriptionDataFromEvent extends ExtractEventDataBehavior {
    constructor(event) {
        super(event);
    }

    async extract() {
        const session = this.event.data.object;
        const stripe_invoice_id = session.invoice;
        const stripe_customer_id = session.customer;

        const userStripeSubscriptions = await stripe.subscriptions.list({
            customer: stripe_customer_id,
            status: 'active'
        });

        const activeStripeSubscription = userStripeSubscriptions?.data?.find((s)=>s.latest_invoice === stripe_invoice_id);

        const subscriptionId = activeStripeSubscription?.id;
        const fullStripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
        if (!fullStripeSubscription || !fullStripeSubscription.items || fullStripeSubscription.items.data.length === 0) {
            throw new Error("Active stripe subscription has no items");
        }

        const stripe_subscription_id = fullStripeSubscription.id;
        const stripe_price_id = fullStripeSubscription.items.data[0].plan.id;

        return {
            session,
            stripe_subscription_id,
            stripe_price_id
        }
    }
}

module.exports = {
    ExtractSubscriptionDataFromEvent
}