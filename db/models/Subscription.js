const mongoose = require('mongoose');
const BaseModelSchema = require('./base/Base');

const Subscription = new mongoose.Schema({
    subscriptionPlan: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'subscriptionPlan' 
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user' 
    },
    suggestion_requests: {
        type: mongoose.SchemaTypes.Number,
        default: 20
    }
});



Subscription.add(BaseModelSchema)
module.exports = mongoose.model('subscription', Subscription);