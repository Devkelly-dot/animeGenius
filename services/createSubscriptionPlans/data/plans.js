const { SubscriptionPlanTitles, SubscriptionPromptSizes } = require("../../../utils/enums/subscription")
require('dotenv').config();

const plans = [
    {
        title: SubscriptionPlanTitles.FREE,
        displayName: 'Free',
        includes: {
            suggestion_requests: 10,
            suggestions_returned: 1,
            max_prompt_size: 200,
            max_tokens: 500,
            length: SubscriptionPromptSizes.SHORT
        }
    },
    {
        title: SubscriptionPlanTitles.PREMIUM,
        displayName: 'Premium',
        price_monthly: process.env.STRIPE_TIER1,
        includes: {
            suggestion_requests: 100,
            suggestions_returned: 3,
            max_prompt_size: 500,
            max_tokens: 1500,
            length: SubscriptionPromptSizes.LONG
        }
    }
]

module.exports = {
    plans
}