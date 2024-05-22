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
        return {
            charge: "Free of charge"
        }
    }
}

module.exports = {
    ChargeUserTotalRequests
}