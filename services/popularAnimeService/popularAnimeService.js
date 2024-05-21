const { RapidAPIAnimeRequestSender } = require("../rapidApiService/rapidApiService");
const { BuildRapidApiPopularAnimeConfig } = require("./behaviors/buildConfigBehavior");

class PopularAnimeService {
    constructor(config) {
        this.config = config;

        this.buildApiConfigBehavior = null;
        this.requestService = null;
    }

    async do() {
        if(!this.config) {
            throw new Error("PopularAnimeService needs a config");
        }

        const buildApiConfig = new this.buildApiConfigBehavior(this.config);
        const apiConfig = await buildApiConfig.do();

        const requestService = new this.requestService(apiConfig);
        const res = await requestService.do();
        return res;
    }
}

class RapidApiPopularAnimeService extends PopularAnimeService {
    constructor(config) {
        super(config);

        this.buildApiConfigBehavior = BuildRapidApiPopularAnimeConfig;
        this.requestService = RapidAPIAnimeRequestSender;
    }
}

module.exports = {
    RapidApiPopularAnimeService
}