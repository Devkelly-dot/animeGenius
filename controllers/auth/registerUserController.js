const { RegisterUserAction } = require("../../serializers/action/auth/registerUserAction");
const { BaseController } = require("../base/base");

class RegisterUserController extends BaseController {
    constructor() {
        this.actionSerializer = RegisterUserAction;

    }
}

module.exports = {
    RegisterUserController
}