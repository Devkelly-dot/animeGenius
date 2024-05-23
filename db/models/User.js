const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const BaseModelSchema = require('./base/Base');
const SubscriptionPlan = require('./SubscriptionPlan');
const Subscription = require('./Subscription');
const { SubscriptionPlanTitles } = require('../../utils/enums/subscription');

const UserModel = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        maxlength: 20,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    subscription: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'subscription' 
    }
});

UserModel.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;

        if (!this.subscription) {
            const freePlan = await SubscriptionPlan.findOne({
                title: SubscriptionPlanTitles.FREE
            });
            const newSub = await Subscription.create({
                subscriptionPlan: freePlan._id,
                user: this._id,
                suggestion_requests: freePlan.includes.suggestion_requests
            });
            this.subscription = newSub._id;
        }

        return next();
    } catch (error) {
        return next(error);
    }
});

UserModel.add(BaseModelSchema)
module.exports = mongoose.model('user', UserModel);