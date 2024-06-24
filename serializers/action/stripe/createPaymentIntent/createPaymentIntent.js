const { BasePostSerializer } = require("../../base/crud/basePostSerializer");

class CreatePaymentIntentActionSerializer extends BasePostSerializer {
    constructor(req) {
        super(req);

        this.required_fields = [
            'subscription_id',
        ];
    }

    async post(verifiedFields) {
        verifiedFields.user = this.req.user;
        verifiedFields.subscription = this.req.subscription;
        console.log(verifiedFields)
        return {
            verifiedFields
        }
    }
}

module.exports = {
    CreatePaymentIntentActionSerializer
}