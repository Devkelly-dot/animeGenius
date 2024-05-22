const { SearchRapidApiByTitle } = require("../../../services/searchAnimeService/searchAnimeService");
const { BaseGetSerializer } = require("../base/crud/baseGetSerializer");

class SearchAnimeActionSerializer extends BaseGetSerializer {
    constructor(req) {
        super(req);
        this.required_query_params = [
            'title'
        ]
    }

    async get(verifiedParams) {
        const searchAnimeService = new SearchRapidApiByTitle(verifiedParams);
        const res = await searchAnimeService.do();
        return res;
    }

}

module.exports = {
    SearchAnimeActionSerializer
}