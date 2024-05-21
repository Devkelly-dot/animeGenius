const { EmailRegistrationService } = require("../../../services/registration/registrationService");
const { BasePostSerializer } = require("../base/crud/basePostSerializer");

class RegisterUserAction extends BasePostSerializer {
    constructor(req) {
        super(req);

        this.required_fields = [
            'email',
            'password'
        ]
    }

    async post(verifiedFields) {
        const emailRegistrationService = new EmailRegistrationService(verifiedFields);
        const newUser = await emailRegistrationService.do();
        return newUser;
    }
}

module.exports = {
    RegisterUserAction
}