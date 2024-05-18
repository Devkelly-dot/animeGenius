const { default: axios } = require("axios");
const errorLogger = require("../../../errorLogger");

class SendRequestBehavior {
    constructor(options) {
        this.options = options;
    }

    async do() {
        if(!this.options) {
            throw new Error("SendRequestBehavior needs to be instantiated with options.");
        }

        const res = await this.sendRequest();
        return res;
    }

    async sendRequest() {
        throw new Error("SendRequestBehavior needs a sendRequest method");
    }
}

class SendRapidAPIRequestWithOptions extends SendRequestBehavior {
    constructor(options) {
        super(options)
    }

    async sendRequest() {
        const options = this.options;
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.log(error?.response?.data);
        }
    }
}

module.exports = {
    SendRapidAPIRequestWithOptions
}