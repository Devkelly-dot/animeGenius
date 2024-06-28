const { ToggleAutoRenewActionSerializer } = require("../../serializers/action/subscription/autoRenew");
const { ToggleAutoRenewSerializer } = require("../../serializers/return/subscription/toggleAutoRenew");
const { BaseController } = require("../base/base");

class AutoRenewController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = ToggleAutoRenewActionSerializer;
        this.returnSerializer = ToggleAutoRenewSerializer;
    }
}

module.exports = {
    AutoRenewController
}