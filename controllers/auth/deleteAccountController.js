const { DeleteUserActionSerializer } = require("../../serializers/action/auth/deleteUserAction");
const { DeleteUserSerializer } = require("../../serializers/return/registerReturnSerializer/deleteUserSerializer");
const { BaseController } = require("../base/base");

class DeleteAccountController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = DeleteUserActionSerializer;
        this.returnSerializer = DeleteUserSerializer;
    }
}

module.exports = {
    DeleteAccountController
}