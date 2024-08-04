const { RapidAPIAnimeRequestSender } = require("../rapidApiService/rapidApiService");
const { BuildRapidApiGetAnime } = require("./behaviors/buildGetDetailsConfig");
const { ConvertToSerializerBehavior } = require("./behaviors/postProcessBehavior");

class AnimeDetailService {
    constructor(config) {
        this.config = config;

        this.buildSearchConfigBehavior = null;
        this.searchService = null;
        this.postProcessBehavior = null;
    }

    async do() {
        if(!this.config) {
            throw new Error("AnimeDetailService needs a config");
        }

        const buildSearchConfigBehavior = new this.buildSearchConfigBehavior(this.config);
        const searchConfig = await buildSearchConfigBehavior.do();

        const searchService = new this.searchService(searchConfig);
        const res = await searchService.do();

        let postProcessData = res;
        if(this.postProcessBehavior) {
            const postProcessBehavior = new this.postProcessBehavior(res);
            postProcessData = await postProcessBehavior.do();
        }
        return postProcessData;
    }
}

class RapidApiAnimeDetailService extends AnimeDetailService {
    constructor(config) {
        super(config);

        this.buildSearchConfigBehavior = BuildRapidApiGetAnime;
        this.searchService = RapidAPIAnimeRequestSender;
        this.postProcessBehavior = ConvertToSerializerBehavior;
    }
}

module.exports = {
    RapidApiAnimeDetailService
}