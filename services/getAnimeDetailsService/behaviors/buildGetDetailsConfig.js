class BuildGetDetailsConfig {
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

class BuildRapidApiGetAnime  extends BuildGetDetailsConfig {
    constructor(config) {
        super(config);
        /*
        {
            title: <string> // title of anime
        }
        */
    }

    async build() {
        if(!this.config?.id) {
            throw new Error("The config object for BuildRapidApiGetAnime must include a 'id' property.");
        }

        const endpoint = `anime/${this.config?.id}`;

        const searchConfig = {
            endpoint
        }

        return searchConfig;
    }
}

module.exports = {
    BuildRapidApiGetAnime
}