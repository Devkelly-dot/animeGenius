const mongoose = require('mongoose');
const BaseModelSchema = require('./base/Base');
const { SubscriptionPromptSizes } = require('../../utils/enums/subscription');

const IncludesSchema = new mongoose.Schema({
    suggestion_requests: {
        type: mongoose.SchemaTypes.Number,
        default: 100
    },
    suggestions_returned: {
        type: mongoose.SchemaTypes.Number,
        default: 1
    },
    max_prompt_size: {
        type: mongoose.SchemaTypes.Number,
        default: 200
    },
    max_tokens: {
        type: mongoose.SchemaTypes.Number,
        default: 500
    },
    length: {
        type: mongoose.SchemaTypes.String,
        default: SubscriptionPromptSizes.SHORT
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
    },
    price_monthly: {
        type: mongoose.SchemaTypes.String,
    },
    price_yearly: {
        type: mongoose.SchemaTypes.String,
    },
    display_price_monthly: {
        type: mongoose.SchemaTypes.Number,
    }
});

SubscriptionPlanModel.add(BaseModelSchema)
module.exports = mongoose.model('subscriptionPlan', SubscriptionPlanModel);