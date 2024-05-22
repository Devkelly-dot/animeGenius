const { RapidAPIAnimeTitleAvailabilityService } = require("../../../services/animeAvailabilityService/animeAvailabilityService");
const { BaseGetSerializer } = require("../base/crud/baseGetSerializer");

class SearchAvailabilityActionSerializer extends BaseGetSerializer {
    constructor(req) {
        super(req);
        this.required_query_params = [
            'title'
        ]
    }

    async get(verifiedParams) {
        const searchAvailability = new RapidAPIAnimeTitleAvailabilityService(verifiedParams);
        const res = await searchAvailability.do();
        return res;
    }

}

module.exports = {
    SearchAvailabilityActionSerializer
}