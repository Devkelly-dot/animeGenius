const { GetUserSubscriptionInformationActionSerializer } = require("../../serializers/action/subscription/getUserSubscriptionInformation");
const { UserSubscriptionInformationSerializer } = require("../../serializers/return/subscription/userSubscriptionInformation");
const { BaseController } = require("../base/base");

class GetSubscriptionInformationController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = GetUserSubscriptionInformationActionSerializer;
        this.returnSerializer = UserSubscriptionInformationSerializer;
    }
}

module.exports = {
    GetSubscriptionInformationController
}