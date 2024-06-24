const { SubscriptionPlanTitles, SubscriptionPromptSizes } = require("../../../utils/enums/subscription")
require('dotenv').config();

const plans = [
    {
        title: SubscriptionPlanTitles.FREE,
        displayName: 'Free',
        includes: {
            suggestion_requests: 20,
            suggestions_returned: 2,
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
            suggestion_requests: 200,
            suggestions_returned: 5,
            max_prompt_size: 500,
            max_tokens: 1500,
            length: SubscriptionPromptSizes.LONG
        }
    }
]

module.exports = {
    plans
}