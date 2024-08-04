const { RapidAPIAnimeRequestSender } = require("../rapidApiService/rapidApiService");
const { BuildRapidApiSearchByTitle } = require("./behaviors/buildSearchConfig");
const { ConvertToSerializerBehavior } = require("./behaviors/postProcessBehavior");

class SearchAnimeService {
    constructor(config) {
        this.config = config;

        this.buildSearchConfigBehavior = null;
        this.searchService = null;
        this.postProcessBehavior = null;
    }

    async do() {
        if(!this.config) {
            throw new Error("SearchAnimeService needs a config");
        }

        const buildSearchConfigBehavior = new this.buildSearchConfigBehavior(this.config);
        const searchConfig = await buildSearchConfigBehavior.do();

        const searchService = new this.searchService(searchConfig);
        const res = await searchService.do();

        let postData = res;

        if(this.postProcessBehavior) {
            const postProcessBehavior = new this.postProcessBehavior(res);
            postData = await postProcessBehavior.do();
        }
        return postData;
    }
}

class SearchRapidApiByTitle extends SearchAnimeService {
    constructor(config) {
        super(config);

        this.buildSearchConfigBehavior = BuildRapidApiSearchByTitle;
        this.searchService = RapidAPIAnimeRequestSender;
        this.postProcessBehavior = ConvertToSerializerBehavior;
    }
}

module.exports = {
    SearchRapidApiByTitle
}