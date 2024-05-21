require('dotenv').config();
const { GptRecommendationsService } = require('../services/recommendationsService/recommendationsService');

async function main() {
    const config = {
        title: 'Death note',
        reason: 'I really like the cat and mouse game between the two main characters. I also like the psychological aspect of the show. Id like to watch another anime with such a cat and mouse game.',
        max: 10,
        length: 'long and specific',
        max_tokens: 1500
    }


    const gptRecommendationsService = new GptRecommendationsService(config);

    const res = await gptRecommendationsService.do();
    console.log("=================================");
    console.log(res);
    console.log("=================================");
    console.log(res?.recommendations);
    console.log("=================================");
    console.log(res?.recommendations?.[0]);
}

main();