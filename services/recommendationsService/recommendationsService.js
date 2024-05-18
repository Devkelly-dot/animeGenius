const OpenAI = require("openai");
const { RecommendationPromptFromTitleAndDescription } = require("./behaviors/recommendationsPromptBehavior");
const { Gpt35JsonReplyService } = require("../gptReplyService/gptReplyService");

const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY ,
    organization: process.env.OPENAI_ORG_ID
})

class RecommendationsService {
    constructor(config) {
        this.config = config;

        this.createPromptBehavior = null;
        this.getGptReplyService = null;
    }

    async do() {
        if(!this.createPromptBehavior) {
            throw new Error("RecommendationsService needs a createPromptBehavior");
        }
        if(!this.getGptReplyService) {
            throw new Error("RecommendationsService needs a getGptReplyService");
        }

        const createPromptBehavior = new this.createPromptBehavior(this.config);
        const prompt = await createPromptBehavior.do();

        const getGptReplyService = new this.getGptReplyService(openai);
        getGptReplyService.setMessages([]);
        getGptReplyService.setNewMessage(prompt);

        const res = await getGptReplyService.do();
        return res;
    }
}

class GptRecommendationsService extends RecommendationsService {
    constructor(config) {
        super(config);
        /*
            config: {
                title: <string>, // title of the anime
                reason: <string>, // reason the user likes the anime
                max: <number> // max results
            }
        */
        this.createPromptBehavior = RecommendationPromptFromTitleAndDescription;
        this.getGptReplyService = Gpt35JsonReplyService;
    }
}

module.exports = {
    GptRecommendationsService
}