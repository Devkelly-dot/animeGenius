const { BaseActionSerializer } = require('../../base/low/baseActionSerializer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class StripeBaseWebhookSerializer extends BaseActionSerializer {
    constructor(req) {
        super(req);
        this.event_type = null;
        this.secret = null;
    }

    async action() {
        if(!this.secret) {
            return {
                error: {
                    code: 400,
                    message: "Stripe secret key not provided"
                }
            }
        }
        const secret = this.secret; 
        const signature = this.req.headers['stripe-signature'];

        console.log("STRIPE INFORMATION: ");
        console.log({
            signature,
            secret,
            body: this.req.body
        })
        try {
            const event = this.extractEvent(this.req.body, signature, secret);
            if (event.type === this.event_type) {
                const res = await this.handleWebhook(event);
                return res;
            } else {
                return {
                    error: {
                        code: 400,
                        message: "Incorrect event type"
                    }
                };
            }
        } catch (error) {
            console.error(error);
            return {
                error: {
                    code: 400,
                    message: 'Webhook signature verification failed.' 
                }
            }
        }
    }

    extractEvent(body, sig, secret) {
        return stripe.webhooks.constructEvent(body, sig, secret);
    }

    async handleWebhook(event) {
        throw new Error("handleWebhook() must be implemented in derived classes");
    }
}

module.exports = {
    StripeBaseWebhookSerializer
}