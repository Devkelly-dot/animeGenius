const { BasePermissionSerializer } = require("../low/basePermissionSerializer");

class BaseGetSerializer extends BasePermissionSerializer {
    constructor(req) {
        super(req);

        this.query_params = [];
    }

    async businessLogic() {
        let verifiedParams = {};
        const query = this.req?.query;

        this.query_params?.forEach((param)=>{
            if(query[param]) {
                verifiedParams[param] = query[param];
            }
        });

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