const { PassportAuthenticateBehavior } = require("./behaviors/authenticateBehavior");
const { GetUserByEmailBehavior } = require("./behaviors/getUserBehavior");
const { TokenPostLoginBehavior } = require("./behaviors/postProcessBehavior");
const { ValidateEmailSigninBehavior } = require("./behaviors/validateBehavior");

class LoginService {
    constructor(loginData) {
        this.loginData = loginData;

        this.validateBehavior = null;
        this.getUserBehavior = null;
        this.authenticateBehavior = null;
        this.postProcessBehavior = null;
    }

    async do() {
        const validateBehavior = new this.validateBehavior(this.loginData);
        const validatedData = await validateBehavior.do();
        if(validatedData?.error) {
            return validatedData;
        }

        const getUserBehavior = new this.getUserBehavior(validatedData);
        const user = await getUserBehavior.do();
        if(user?.error) {
            return user;
        }

        const authenticateBehavior = new this.authenticateBehavior(user, validatedData);
        const authenticated = await authenticateBehavior.do();
        if(authenticated?.error) {
            return authenticated;
        }

        const postProcessBehavior = new this.postProcessBehavior(user);
        const newUser = await postProcessBehavior.do();
        return newUser;
    }
}

class EmailPassLoginService extends LoginService {
    constructor(loginData) {
        super(loginData);

        this.validateBehavior = ValidateEmailSigninBehavior;
        this.getUserBehavior = GetUserByEmailBehavior;
        this.authenticateBehavior = PassportAuthenticateBehavior;
        this.postProcessBehavior = TokenPostLoginBehavior;
    }
}

module.exports = {
    EmailPassLoginService
}