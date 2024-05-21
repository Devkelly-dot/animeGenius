const { RapidApiPopularAnimeService } = require("../../../services/popularAnimeService/popularAnimeService");
const { BaseGetSerializer } = require("../base/crud/baseGetSerializer");

class FetchPopularAnimeSerializer extends BaseGetSerializer {
    constructor(req) {
        super(req);
    }

    async get(verifiedParams) {
        const popularAnimeService = new RapidApiPopularAnimeService(verifiedParams);
        const res = await popularAnimeService.do();
        return res;
    }

}

module.exports = {
    FetchPopularAnimeSerializer
}