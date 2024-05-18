const { CreateGetAnimeRequestBehavior, CreateStreamingAvailOptions } = require("./createRequestBehavior/createRequestBehavior");
const { SendRapidAPIRequestWithOptions } = require("./sendRequestBehavior/sendRequestBehavior");

class RapidApiService {
    constructor(config) {
        this.config = config;

        this.createRequestBehavior = null;
        this.sendRequestBehavior = null;
    }

    async do() {
        if(!this.config) {
            throw new Error("RapidApiService needs a config")
        }
        if(!this.createRequestBehavior) {
            throw new Error("RapidApiService needs a createRequestBehavior")
        }
        if(!this.sendRequestBehavior) {
            throw new Error("RapidApiService needs a sendRequestBehavior")
        }

        const createRequestBehavior = new this.createRequestBehavior(this.config);
        const options = await createRequestBehavior.do();

        if(options?.error) {
            return options;
        }
        
        const sendRequestBehavior = new this.sendRequestBehavior(options);
        const res = await sendRequestBehavior.do();
        return res;
    }

    setConfig(config) {
        this.config = config;
    }
}

class RapidAPIRequestSender extends RapidApiService {
    constructor(config) {
        super(config);

        this.createRequestBehavior = null;
        this.sendRequestBehavior = SendRapidAPIRequestWithOptions;
    }
}

class RapidAPIAnimeRequestSender extends RapidAPIRequestSender {
    constructor(config) {
        super(config);

        this.createRequestBehavior = CreateGetAnimeRequestBehavior;
    }
}

class RapidAPIStreamingAvailRequestSender extends RapidAPIRequestSender {
    constructor(config) {
        super(config);

        this.createRequestBehavior = CreateStreamingAvailOptions;
    }
}

module.exports = {
    RapidAPIAnimeRequestSender,
    RapidAPIStreamingAvailRequestSender
}