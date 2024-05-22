const { BasePermissionSerializer } = require("../low/basePermissionSerializer");

class BaseGetSerializer extends BasePermissionSerializer {
    constructor(req) {
        super(req);

        this.required_query_params = [];
    }

    async businessLogic() {
        let verifiedParams = {};
        const query = this.req?.query;
        let missing_params = [];

        this.required_query_params?.forEach((param)=>{
            if(query[param]) {
                verifiedParams[param] = query[param];
            } else {
                missing_params.push(param);
            }
        });

        if(missing_params.length > 0) {
            return {
                error: {
                    code: 400,
                    message: `Missing required query params: ${missing_params.join(", ")}`
                }
            }
        }

        const data = await this.get(verifiedParams);
        return data;
    }

    async get(verifiedParams) {
        throw new Error("BaseGetSerializer needs a get method");
    }
}

module.exports = {
    BaseGetSerializer
}