const User = require("../../../db/models/User");

class FindUserDataBehavior {
    constructor(data) {
        this.data = data;
    }

    async do() {
        const data = await this.find();
        return data;
    }

    async find() {
        throw new Error("find() must be implemented in derived classes");
    }
}

class FindUserByStripeIdBehavior extends FindUserDataBehavior {
    constructor(data) {
        super(data);
    }

    async find() {
        const stripe_id = data.customer_stripe_id;
        const user = await User.findOne({
            stripe_id: stripe_id
        })
        .populate('subscription');

        if(!user) {
            return {
                error: {
                    code: 404,
                    message: "User with this stripe id not found"
                }
            }
        }
        return {user};
    }
}

module.exports = {
    FindUserByStripeIdBehavior
}