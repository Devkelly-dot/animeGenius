const { EmailPassLoginService } = require("../../../services/loginService/loginService");
const { BasePostSerializer } = require("../base/crud/basePostSerializer");

class LoginByEmailPassAction extends BasePostSerializer {
    constructor(req) {
        super(req);

        this.required_fields = [
            'email',
            'password'
        ]
    }

    async post(verifiedFields) {
        const emailRegistrationService = new EmailPassLoginService(verifiedFields);
        const user = await emailRegistrationService.do();
        return user;
    }
}

module.exports = {
    LoginByEmailPassAction
}