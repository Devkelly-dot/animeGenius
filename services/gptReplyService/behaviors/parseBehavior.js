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
            console.log(cleanedReply);
            responseObject = JSON.parse(cleanedReply);
        } catch (e) {
            return {
                error: {
                    code: 500,
                    message: `Something went wrong getting recommendation list.
                    This did not count towards your daily limit. Please try again with a 
                    slightly different description.`
                }
            }
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