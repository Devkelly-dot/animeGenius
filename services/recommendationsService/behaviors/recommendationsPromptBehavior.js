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

        const title = `${config?.title}`;
        const reason = `${config?.reason}`;
        const max = `${config?.max?config.max:3}`;
        const length = `${config?.length?config.length:'short'}`;

        let getReccsPrompt = '';
        if(title) {
            getReccsPrompt+=`The user likes ${title}. `
        }
        getReccsPrompt += `
            their reasoning for liking it is: 
            ${reason}

            please respond with a list of ${max} recommendations in the following JSON format: 

            {
                recommendations: {
                    title: <string>, // title of the anime in English.
                    reason: <string> // why the user would like this anime. give a ${length} reason. No spoilers.
                }[]
            }

            MAKE SURE THE JSON FORMAT IS COMPLETE EVEN IF IT MEANS STOPPING EARLY. IT HAS TO BE VALID JSON
        `

        return getReccsPrompt;
    }
}

module.exports = {
    RecommendationPromptFromTitleAndDescription
}