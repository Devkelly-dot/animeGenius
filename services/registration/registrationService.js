const { CreateUserFromForm } = require("../createUserService/createUserService");
const { PostRegisterGenerateToken } = require("./behaviors/postProcessBehavior");
const { ValidateRegisterFormBehavior } = require("./behaviors/validateBehavior");

class RegistrationService {
    constructor(form) {
        this.form = form;

        this.validateBehavior = null;
        this.createUserService = null;
        this.postProcessBehavior = null;
    }

    async do() {
        const validateBehavior = new this.validateBehavior(this.form);
        const validatedData = await validateBehavior.do();

        if(validatedData?.error) {
            return validatedData;
        }

        const createUserService = new this.createUserService(validatedData);
        const userData = await createUserService.do();

        let returnUser = userData;
        if(this.postProcessBehavior) {
            const postProcessBehavior = new this.postProcessBehavior(userData);
            returnUser = await postProcessBehavior.do();
        }

        return returnUser;
    }
}

class EmailRegistrationService extends RegistrationService {
    constructor(newUser) {
        super(newUser);

        this.validateBehavior = ValidateRegisterFormBehavior;
        this.createUserService = CreateUserFromForm;
        this.postProcessBehavior = PostRegisterGenerateToken;
    }
}

module.exports = {
    EmailRegistrationService
}