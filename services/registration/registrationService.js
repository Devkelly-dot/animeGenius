const { CreateUserFromForm } = require("../createUserService/createUserService");
const { ValidateRegisterFormBehavior } = require("./behaviors/validateBehavior");

class RegistrationService {
    constructor(form) {
        this.form = form;

        this.validateBehavior = null;
        this.createUserService = null;
    }

    async do() {
        const validateBehavior = new this.validateBehavior(this.form);
        const validatedData = await validateBehavior.do();

        if(validatedData?.error) {
            return validatedData;
        }

        const createUserService = new this.createUserService(validatedData);
        const userData = await createUserService.do();
        return userData;
    }
}

class EmailRegistrationService extends RegistrationService {
    constructor(newUser) {
        super(newUser);

        this.validateBehavior = ValidateRegisterFormBehavior;
        this.createUserService = CreateUserFromForm;
    }
}

module.exports = {
    EmailRegistrationService
}