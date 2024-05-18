const { RapidAPIStreamingAvailRequestSender } = require("../rapidApiService/rapidApiService");
const { RapidApiConfigFromTitle } = require("./behaviors/createApiConfig");
const { AnimeAvailabilityFilterByTitle } = require("./behaviors/postProcessBehavior");

class AnimeAvailabilityService {
    constructor(config) {
        this.config = config;

        this.createConfigBehavior = null;
        this.sendRequestService = null;
        this.postProcessBehavior = null;
    }

    async do() {
        const createConfigBehavior = new this.createConfigBehavior(this.config);
        const request_config = await createConfigBehavior.do();
        if(request_config?.error) {
            return request_config;
        }

        const sendRequestService = new this.sendRequestService(request_config);
        const res = await sendRequestService.do();
        if(res?.error) {
            return res;
        }

        if(this.postProcessBehavior) {
            const postProcessBehavior = new this.postProcessBehavior(this.config, res);
            const data = await postProcessBehavior.do();
            return data;
        }

        return res;
    }
}

class RapidAPIAnimeTitleAvailabilityService extends AnimeAvailabilityService {
    constructor(config) {
        super(config);

        this.createConfigBehavior = RapidApiConfigFromTitle;
        this.sendRequestService = RapidAPIStreamingAvailRequestSender;
        this.postProcessBehavior = AnimeAvailabilityFilterByTitle;
    }
}

module.exports = {
    RapidAPIAnimeTitleAvailabilityService
}