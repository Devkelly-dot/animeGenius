const Subscription = require("../../../db/models/Subscription");

class ChargeUserBehavior {
    constructor(data) {
        this.data = data;
    }

    async do() {
        const chargeData = await this.chargeUser();
        return chargeData;
    }

    async chargeUser() {
        throw new Error("ChargeUserBehavior needs a chargeUser method");
    }
}

class ChargeUserTotalRequests extends ChargeUserBehavior {
    constructor(data) {
        super(data);
    }

    async chargeUser() {
        await Subscription.updateOne(
            { _id: this.data?.user?.subscription },
            { $inc: { suggestion_requests: -1 } }
        );
    }
}

module.exports = {
    ChargeUserTotalRequests
}