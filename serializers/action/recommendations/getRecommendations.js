const { UserRequestRecommendationsCharged } = require("../../../services/userRequestRecommendations/userRequestRecommendations");
const { BasePostSerializer } = require("../base/crud/basePostSerializer");

class GetRecommendationsActionSerializer extends BasePostSerializer {
    constructor(req) {
        super(req);

        this.required_fields = [
            'reason',
        ];

        this.optional_fields = [
            'title'
        ]
    }

    async post(verifiedFields) {
        verifiedFields.user = this.req.user;
        const recommendationService = new UserRequestRecommendationsCharged(verifiedFields);
        const recommendations = await recommendationService.do();
        return recommendations;
    }
}

module.exports = {
    GetRecommendationsActionSerializer
}