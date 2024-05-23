const { ResetAllSubs } = require("./resetBehavior/resetBehavior");

class ResetRequestsService {
    constructor() {
        this.resetBehavior = null;
    }

    async do() {
        if (this.resetBehavior) {
            const resetBehavior = new this.resetBehavior();
            await resetBehavior.do();
        } else {
            throw new Error("No reset behavior set");
        }
    }
}

class ResetAllSubscriptionsRequestsService extends ResetRequestsService {
    constructor() {
        super();
        this.resetBehavior = ResetAllSubs;
    }
}

module.exports = {
    ResetAllSubscriptionsRequestsService
}