class BuildSearchConfig {
    constructor(config) {
        this.config = config;
    }

    async do() {
        const searchConfig = await this.build();
        return searchConfig;
    }

    async build() {
        throw new Error("BuildSearchConfig needs a build method");
    }
}

class BuildRapidApiSearchByTitle  extends BuildSearchConfig {
    constructor(config) {
        super(config);
        /*
        {
            title: <string> // title of anime
        }
        */
    }

    async build() {
        if(!this.config?.title) {
            throw new Error("The config object for BuildRapidApiSearchByTitle must include a 'title' property.");
        }

        const endpoint = 'v2/anime/search';
        const params = {
            q: `${this.config?.title}`,
            n: '50',
        }

        const searchConfig = {
            endpoint, 
            params
        }

        return searchConfig;
    }
}

module.exports = {
    BuildRapidApiSearchByTitle
}