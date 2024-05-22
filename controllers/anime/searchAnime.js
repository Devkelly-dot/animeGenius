const { SearchAnimeActionSerializer } = require("../../serializers/action/anime/searchAnime");
const { RapidApiAnimeSerializer } = require("../../serializers/return/anime/rapidApiAnimeSerializer");
const { BaseController } = require("../base/base");

class SearchAnimeController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = SearchAnimeActionSerializer;
        this.returnSerializer = RapidApiAnimeSerializer;
    }
}

module.exports = {
    SearchAnimeController
}