const User = require("../../../db/models/User");

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

        const exists = await User.exists({email});
        if(exists) {
            return {
                error: {
                    code: 409,
                    message: 'User with that email already exists'
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