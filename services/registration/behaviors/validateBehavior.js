class ValidateRegisterBehavior {
    constructor(userForm) {
        this.userForm = userForm;
    }

    async do() {
        if(!this.userForm) {
            throw new Error("ValidateRegisterBehavior needs to be instantiated with a userForm");
        }
        const validatedData = await this.validate();
        return validatedData;
    }

    async validate() {
        throw new Error("ValidateRegisterBehavior needs a validate method");
    }
}

class ValidateRegisterFormBehavior extends ValidateRegisterBehavior {
    constructor(userForm) {
        super(userForm);
    }

    async validate() {
        const {email, password, username} = this.userForm;
        if(!email || !password) {
            return {
                error: {
                    code: 400,
                    message: 'Please provide email and password'
                }
            }
        }

        return {
            email, 
            password,
            username
        }
    }
}

module.exports = {
    ValidateRegisterFormBehavior
}