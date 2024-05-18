const { RapidAPIStreamingAvailRequestSender } = require("../rapidApiService/rapidApiService");
const { RapidApiConfigFromTitle } = require("./behaviors/createApiConfig");

class AnimeAvailabilityService {
    constructor(config) {
        this.config = config;

        this.createConfigBehavior = null;
        this.sendRequestService = null;
    }

    async do() {
        const createConfigBehavior = new this.createConfigBehavior(this.config);
        const request_config = createConfigBehavior.do();

        const sendRequestService = new this.sendRequestService(request_config);
        const res = await sendRequestService.do();
        return res;
    }
}

class RapidAPIAnimeTitleAvailabilityService extends AnimeAvailabilityService {
    constructor(config) {
        super(config);

        this.createConfigBehavior = RapidApiConfigFromTitle;
        this.sendRequestService = RapidAPIStreamingAvailRequestSender;
    }
}

module.exports = {
    RapidAPIAnimeTitleAvailabilityService
}