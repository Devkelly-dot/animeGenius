const { RapidAPIAnimeRequestSender } = require("../rapidApiService/rapidApiService");
const { BuildRapidApiGetAnime } = require("./behaviors/buildGetDetailsConfig");

class AnimeDetailService {
    constructor(config) {
        this.config = config;

        this.buildSearchConfigBehavior = null;
        this.searchService = null;
    }

    async do() {
        if(!this.config) {
            throw new Error("AnimeDetailService needs a config");
        }

        const buildSearchConfigBehavior = new this.buildSearchConfigBehavior(this.config);
        const searchConfig = await buildSearchConfigBehavior.do();

        const searchService = new this.searchService(searchConfig);
        const res = await searchService.do();
        return res;
    }
}

class RapidApiAnimeDetailService extends AnimeDetailService {
    constructor(config) {
        super(config);

        this.buildSearchConfigBehavior = BuildRapidApiGetAnime;
        this.searchService = RapidAPIAnimeRequestSender;
    }
}

module.exports = {
    RapidApiAnimeDetailService
}