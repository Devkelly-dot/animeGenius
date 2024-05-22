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
        this.length = 'short but specific';
    }

    async build() {
        if(!this.config) {
            throw new Error("BuildGPTRecommendationConfig needs a config");
        }

        const body = this.config;
        const config = {
            title: body.title,
            reason: body.reason,
            max: this.max,
            length: 'long and specific',
            max_tokens: this.max_tokens
        }

        return config;
    }
}

module.exports = {
    BuildGPTRecommendationConfig
}