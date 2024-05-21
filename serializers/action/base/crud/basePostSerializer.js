const { BasePermissionSerializer } = require("../low/basePermissionSerializer");

class BasePostSerializer extends BasePermissionSerializer {
    constructor(req) {
        super(req);

        this.required_fields = [];
        this.optional_fields = [];
    }

    async businessLogic() {
        let missing_fields = [];
        const body = this.req?.body;
        let verifiedFields = {};

        if(!body) {
            throw new Error("BasePostSerializer needs a body");
        }

        this.required_fields?.forEach((f)=>{
            if(!body[f]) {
                missing_fields.push(f);
            } else {
                verifiedFields[f] = body[f];
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

        this.optional_fields?.forEach((f)=>{
            if(body[f]) {
                verifiedFields[f] = body[f];
            }
        });

        const data = await this.post(verifiedFields);
        return data;
    }

    async post(verifiedFields) {
        throw new Error("BasePostSerializer needs a post method");
    }
}

module.exports = {
    BasePostSerializer
}