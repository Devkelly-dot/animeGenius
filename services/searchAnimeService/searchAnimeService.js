const { RapidAPIAnimeRequestSender } = require("../rapidApiService/rapidApiService");
const { BuildRapidApiSearchByTitle } = require("./behaviors/buildSearchConfig");

class SearchAnimeService {
    constructor(config) {
        this.config = config;

        this.buildSearchConfigBehavior = null;
        this.searchService = null;
    }

    async do() {
        if(!this.config) {
            throw new Error("SearchAnimeService needs a config");
        }

        const buildSearchConfigBehavior = new this.buildSearchConfigBehavior(this.config);
        const searchConfig = await buildSearchConfigBehavior.do();

        const searchService = new this.searchService(searchConfig);
        const res = await searchService.do();
        return res;
    }
}

class SearchRapidApiByTitle extends SearchAnimeService {
    constructor(config) {
        super(config);

        this.buildSearchConfigBehavior = BuildRapidApiSearchByTitle;
        this.searchService = RapidAPIAnimeRequestSender;
    }
}

module.exports = {
    SearchRapidApiByTitle
}