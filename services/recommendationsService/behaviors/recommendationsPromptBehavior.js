class RecommendationsPromptBehavior {
    constructor(config) {
        this.config = config;
    }

    async do() {
        if(!this.config) {
            throw new Error("RecommendationsPromptBehavior needs a config");
        }

        const prompt = await this.createPrompt();
        return prompt;
    }

    async createPrompt() {
        throw new Error("RecommendationsPromptBehavior needs a createPrompt method")
    }
}

class RecommendationPromptFromTitleAndDescription extends RecommendationsPromptBehavior {
    constructor(config) {
        super(config);
    }

    async createPrompt() {
        const config = this.config;

        if(!config?.title) {
            throw new Error("RecommendationPromptFromTitleAndDescription's config needs a title")
        }

        const title = `${config?.title}`;
        const reason = `${config?.reason}`;
        const max = `${config?.max?config.max:3}`;
        
        const getReccsPrompt = `
            The user likes ${title}. 
            their reasoning for liking it is: 
            ${reason}

            please respond with a list of 1 - ${max} recommendations in the following JSON format: 

            {
                recommendations: {
                    title: <string>, // title of the anime
                    reason: <string> // why the user would like this anime
                }[]
            }
        `

        return getReccsPrompt;
    }
}

module.exports = {
    RecommendationPromptFromTitleAndDescription
}