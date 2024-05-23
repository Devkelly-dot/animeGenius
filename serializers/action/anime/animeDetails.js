const { RapidApiAnimeDetailService } = require("../../../services/getAnimeDetailsService/animeDetailService");
const { BaseGetSerializer } = require("../base/crud/baseGetSerializer");

class AnimeDetailsActionSerializer extends BaseGetSerializer {
    constructor(req) {
        super(req);
    }

    async get(verifiedParams) {
        const {id} = this.req.params;
        verifiedParams.id = id;
        const animeDetailsService = new RapidApiAnimeDetailService(verifiedParams);
        const res = await animeDetailsService.do();
        return res;
    }

}

module.exports = {
    AnimeDetailsActionSerializer
}