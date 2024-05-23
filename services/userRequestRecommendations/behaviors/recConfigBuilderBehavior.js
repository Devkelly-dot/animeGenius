const { SubscriptionPromptSizes } = require("../../../utils/enums/subscription");

class RecConfigBuilderBehavior {
    constructor(config) {
        this.config = config;
    }

    async do() {
        const recConfig = await this.build();
        return recConfig;
    }

    async build() {
        throw new Error("RecConfigBuilderBehavior needs a build method");
    }
}

class BuildGPTRecommendationConfig extends RecConfigBuilderBehavior {
    constructor(config) {
        super(config);
        this.max_tokens = 500;
        this.max = 5;
        this.length = SubscriptionPromptSizes.SHORT;
        this.max_prompt_size = 200;
    }

    async build() {
        if(!this.config) {
            throw new Error("BuildGPTRecommendationConfig needs a config");
        }
        const {subscription} = this.config;
        const body = this.config;
        const max = subscription?.subscriptionPlan?.includes?.suggestions_returned?subscription?.subscriptionPlan?.includes?.suggestions_returned:this.max;
        const max_tokens = subscription?.subscriptionPlan?.includes?.max_tokens?subscription?.subscriptionPlan?.includes?.max_tokens:this.max_tokens;
        const length = subscription?.subscriptionPlan?.includes?.length?subscription?.subscriptionPlan?.includes?.length:this.length;
        const max_prompt_size = subscription?.subscriptionPlan?.includes?.max_prompt_size?subscription?.subscriptionPlan?.includes?.max_prompt_size:this.max_prompt_size;
        
        const config = {
            title: body.title?.slice(0, 100),
            reason: body.reason?.slice(0, max_prompt_size),
            max: max,
            length: length,
            max_tokens: max_tokens
        }

        console.log(config);
        return config;
    }
}

module.exports = {
    BuildGPTRecommendationConfig
}