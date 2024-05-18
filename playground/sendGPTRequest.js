require('dotenv').config();
const { GptRecommendationsService } = require('../services/recommendationsService/recommendationsService');

async function main() {
    const config = {
        title: 'One Piece',
        reason: 'I like the sword fighting',
        max: 3
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