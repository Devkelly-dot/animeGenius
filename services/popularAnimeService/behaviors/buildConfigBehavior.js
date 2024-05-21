class BuildPopularConfig {
    constructor(config) {
        this.config = config;
    }

    async do() {
        const apiConfig = await this.build();
        return apiConfig;
    }

    async build() {
        throw new Error("BuildPopularConfig needs a build method");
    }
}

class BuildRapidApiPopularAnimeConfig  extends BuildPopularConfig {
    constructor(config) {
        super(config);
        this.category = 'all';
    }

    async build() {
        const endpoint = `anime/top/${this.category}`;
        const searchConfig = {
            endpoint, 
        }

        return searchConfig;
    }
}

module.exports = {
    BuildRapidApiPopularAnimeConfig
}