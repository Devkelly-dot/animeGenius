const { SetAutoRenewBehavior } = require("./toggleBehavior/toggleBehavior");

class AutoRenewHandler {
    constructor(config) {
        this.config = config;

        this.toggleBehavior = SetAutoRenewBehavior;
    }

    async do(){
        const toggleBehavior = new this.toggleBehavior(this.config);
        const toggleData = await toggleBehavior.do();
        return toggleData;
    }
}

module.exports = {
    AutoRenewHandler
}