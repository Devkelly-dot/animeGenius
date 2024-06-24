const Subscription = require("../../db/models/Subscription");

class GetUserSubscription {
    async do(req, res, next) {
        if(!req.user) {
            await this.noUser(req, res, next);
        } else {
            await this.user(req, res, next);
        }
    }

    async noUser(req, res, next) {
        return res.status(401).json({ message: 'Please logout and log back in to continue.' });
    }

    async user(req, res, next) {
        const subscription = await Subscription.findOne({ user: req.user._id }).populate('subscriptionPlan');
        req.subscription = subscription;
        next();
    }
}

class GetSubIfExists extends GetUserSubscription {
    constructor() {
        super();
    }

    async noUser(req, res, next) {
        next();
    }
}

module.exports = {
    GetUserSubscription,
    GetSubIfExists
}