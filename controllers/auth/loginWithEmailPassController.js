const { LoginByEmailPassAction } = require("../../serializers/action/auth/loginByEmailPassAction");
const { LoginByEmailPassSerializer } = require("../../serializers/return/registerReturnSerializer/loginByEmailPassSerializer");
const { BaseController } = require("../base/base");

class LoginWithEmailPassController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = LoginByEmailPassAction;
        this.returnSerializer = LoginByEmailPassSerializer;
    }
}

module.exports = {
    LoginWithEmailPassController
}