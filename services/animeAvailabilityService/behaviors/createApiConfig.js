class CreateApiConfigBehavior {
    constructor(config) {
        this.config = config;
    }
    
    async do() {
        const request_config = await this.createConfig();
        return request_config;
    }

    async createConfig() {
        throw new Error("CreateApiConfigBehavior needs a createConfig method")
    }
}

class RapidApiConfigFromTitle extends CreateApiConfigBehavior {
    constructor(config) {
        super(config);
    } 

    async createConfig() {
        const config = this.config;

        if(!config) {
            throw new Error("RapidApiConfigFromTitle requires a title in the config object");
        }
        
        const endpoint = 'search/title';
        const params = {
            title: `${config.title}`,
            country: 'us',
            show_type: 'all'
        }

        const request_config = {
            endpoint,
            params
        }

        return request_config;
    }
}

module.exports = {
    RapidApiConfigFromTitle
}