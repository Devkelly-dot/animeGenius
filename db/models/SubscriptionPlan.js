const mongoose = require('mongoose');
const BaseModelSchema = require('./base/Base');

const IncludesSchema = new mongoose.Schema({
    suggestion_requests: {
        type: mongoose.SchemaTypes.Number,
        default: 100
    },
    suggestions_returned: {
        type: mongoose.SchemaTypes.Number,
        default: 2
    },
    max_prompt_size: {
        type: mongoose.SchemaTypes.Number,
        default: 200
    },
    max_tokens: {
        type: mongoose.SchemaTypes.Number,
        default: 500
    }
}, { _id: false });

const SubscriptionPlanModel = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
    },
    displayName: {
        type: mongoose.SchemaTypes.String,
    },
    includes: {
        type: IncludesSchema // Embedding the includes schema
    }
});

SubscriptionPlanModel.add(BaseModelSchema)
module.exports = mongoose.model('subscriptionPlan', SubscriptionPlanModel);