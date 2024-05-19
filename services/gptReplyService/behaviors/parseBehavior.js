class ParseResponseBehavior {
    constructor(response) {
        this.response = response;
    }

    async do() {
        if(!this.response) {
            throw new Error("ParseResponseBehavior needs a response");
        }

        const data = await this.parse();
        return data;
    }

    async parse() {
        throw new Error("ParseResponseBehavior needs a parse method");
    }
}

class ParseResponseToJSON extends ParseResponseBehavior {
    constructor(response) {
        super(response);
    }

    async parse() {
        const res = this.response;
        const content = res?.message?.content;
        const cleanedReply = content?.replace(/([{,]\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$2":');
        let responseObject = {};
        try {
            responseObject = JSON.parse(cleanedReply);
        } catch (e) {
            console.log("Couldn't parse");
            console.log(cleanedReply)
        }
        // console.log("RES: ", res);
        // console.log("CLEANED: ", cleanedReply);
        // console.log("OBJECT: ", responseObject);
        return responseObject;
    }
}

module.exports = {
    ParseResponseToJSON
}