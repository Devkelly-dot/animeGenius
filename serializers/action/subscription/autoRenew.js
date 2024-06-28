const { AutoRenewHandler } = require("../../../services/autoRenewHandler/autoRenewHandler");
const { BasePostSerializer } = require("../base/crud/basePostSerializer");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class ToggleAutoRenewActionSerializer extends BasePostSerializer {
    constructor(req) {
        super(req);

        this.required_fields = [
            'autoRenew',
        ];
    }

    async post(verifiedParams) {
        const user = this.req.user;
        const subscription = this.req.subscription;
       
        const autoRenewHandler = new AutoRenewHandler({user, subscription, ...verifiedParams});
        const data = await autoRenewHandler.do();
        return data;
    }
}

module.exports = {
    ToggleAutoRenewActionSerializer
}