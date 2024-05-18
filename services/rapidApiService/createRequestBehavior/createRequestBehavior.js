require('dotenv').config();

class CreateRequestBehavior {
    constructor(config) {
        this.config = config;
    }

    async do() {
        if(!this.config) {
            throw new Error("CreateRequestBehavior should be instantiated with a config object")
        }

        const options = await this.createRequest();
        return options;
    }

    async createRequest() {
        throw new Error("CreateRequestBehavior needs a createRequest method");
    }
}

class CreateGetAnimeRequestBehavior extends CreateRequestBehavior {
    constructor(config) {
        super(config);
        /*
            const endpoint = 'search';
            const params = {
                q: 'Black Clover',
                n: '50',
            }

            const config = {
                endpoint: <string>, //'search'
                params: {
                    q: <string>, // 'Black Clover',
                    n: <number> // results to return
                }
            }
        */
        this.method = 'GET';
        this.baseUrl = `https://myanimelist.p.rapidapi.com/v2/anime`;
        this.rapidApiHost = 'myanimelist.p.rapidapi.com';
    }

    async createRequest() {
        if(!this.baseUrl) {
            throw new Error("CreateGetAnimeRequestBehavior needs a baseUrl");
        }

        const method = this.method;
        const config = this.config;

        let url = `${this.baseUrl}`;
        if(config.endpoint) {
            url+=`/${config?.endpoint}`;
        }

        const params = config.params;
        const headers = {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': this.rapidApiHost
        };

        const options = {
            method,
            url,
            params,
            headers
        }
        
        return options;
    }
}

class CreateStreamingAvailOptions extends CreateGetAnimeRequestBehavior {
    constructor(config) {
        super(config);
        this.baseUrl = `https://streaming-availability.p.rapidapi.com`;
        this.rapidApiHost = 'streaming-availability.p.rapidapi.com';
    }
}
module.exports = {
    CreateGetAnimeRequestBehavior,
    CreateStreamingAvailOptions
}