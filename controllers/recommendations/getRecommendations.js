const { GetRecommendationsActionSerializer } = require("../../serializers/action/recommendations/getRecommendations");
const { RecommendationsSerializer } = require("../../serializers/return/recommendations/recommendationsSerializer");
const { BaseController } = require("../base/base");

class GetRecommendationsController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = GetRecommendationsActionSerializer;
        this.returnSerializer = RecommendationsSerializer;
    }
}

module.exports = {
    GetRecommendationsController
}