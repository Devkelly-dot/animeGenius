const { AnimeDetailsActionSerializer } = require("../../serializers/action/anime/animeDetails");
const { RapidApiAnimeSerializer } = require("../../serializers/return/anime/rapidApiAnimeSerializer");
const { BaseController } = require("../base/base");

class GetAnimeDetailsController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = AnimeDetailsActionSerializer;
        this.returnSerializer = RapidApiAnimeSerializer;
    }
}

module.exports = {
    GetAnimeDetailsController
}