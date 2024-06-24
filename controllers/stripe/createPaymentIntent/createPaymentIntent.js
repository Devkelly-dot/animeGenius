const { CreatePaymentIntentActionSerializer } = require("../../../serializers/action/stripe/createPaymentIntent/createPaymentIntent");
const { PaymentIntentReturnSerializer } = require("../../../serializers/return/stripe/createPaymentIntent/paymentIntent");
const { BaseController } = require("../../base/base");

class CreatePaymentIntentController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = CreatePaymentIntentActionSerializer;
        this.returnSerializer = PaymentIntentReturnSerializer;
    }
}

module.exports = {
    CreatePaymentIntentController
}