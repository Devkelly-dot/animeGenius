const { AutoRenewHandler } = require("../../../services/autoRenewHandler/autoRenewHandler");
const { DeleteUserService } = require("../../../services/deleteUserService/deleteUserService");
const { BasePostSerializer } = require("../base/crud/basePostSerializer");
require('dotenv').config();

class DeleteUserActionSerializer extends BasePostSerializer {
    constructor(req) {
        super(req);

        this.required_fields = [
            'password',
        ];
    }

    async post(verifiedParams) {
        const user = this.req.user;
       
        const deleteUserService = new DeleteUserService({user, ...verifiedParams});
        const data = await deleteUserService.do();
        return data;
    }
}

module.exports = {
    DeleteUserActionSerializer
}