const { BaseActionSerializer } = require("./baseActionSerializer");

class BasePostSerializer extends BaseActionSerializer {
    constructor(req) {
        super(req);

        this.required_fields = [];
        this.optional_fields = [];
    }

    async doAction() {
        let missing_fields = [];
        const body = this.req?.body;
        if(!body) {
            throw new Error("BasePostSerializer needs a body");
        }

        this.required_fields?.forEach((f)=>{
            if(!body[f]) {
                missing_fields.push(f);
            }
        });

        if(missing_fields.length > 0) {
            return {
                error: {
                    code: 400,
                    message: `Missing Fields: ${missing_fields}`
                }
            }
        }
        const data = await this.post();
        return data;
    }

    async post() {
        throw new Error("BasePostSerializer needs a post method");
    }
}

module.exports = {
    BasePostSerializer
}