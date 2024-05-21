const { FetchPopularAnimeSerializer } = require("../../serializers/action/anime/fetchPopular");
const { PopularAnimeSerializer } = require("../../serializers/return/anime/popularAnimeSerializer");
const { BaseController } = require("../base/base");

class FetchPopoularController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = FetchPopularAnimeSerializer;
        this.returnSerializer = PopularAnimeSerializer;
    }
}

module.exports = {
    FetchPopoularController
}