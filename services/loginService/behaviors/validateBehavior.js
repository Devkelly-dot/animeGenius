class ValidateBehavior {
    constructor(loginData) {
        this.loginData = loginData;
    }

    async do() {
        const validatedData = await this.validate();
        return validatedData;
    }

    async validate() {
        throw new Error("ValidateBehavior needs a validate method")
    }
}

class ValidateEmailSigninBehavior extends ValidateBehavior {
    constructor(loginData) {
        super(loginData);
    }

    async validate() {
        if(!this.loginData?.email || !this.loginData?.password) {
            return {
                error: {
                    code: 400, 
                    message: 'Email and password are required'
                }
            }
        }

        const validatedData = {
            email: this.loginData?.email,
            password: this.loginData?.password
        }

        return validatedData;
    }
}

module.exports = {
    ValidateEmailSigninBehavior
}