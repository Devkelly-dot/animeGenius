const { RegisterUserAction } = require("../../serializers/action/auth/registerUserAction");
const { RegisterByEmailSerializer } = require("../../serializers/return/registerReturnSerializer/registerByEmailSerializer");
const { BaseController } = require("../base/base");

class RegisterUserController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = RegisterUserAction;
        this.returnSerializer = RegisterByEmailSerializer;
    }
}

module.exports = {
    RegisterUserController
}