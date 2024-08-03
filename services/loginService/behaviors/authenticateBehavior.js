const bcrypt = require('bcrypt');

class AuthenticateBehavior {
    constructor(user, authData) {
        this.user = user;
        this.authData = authData;
    }

    async do() {
        const data = await this.authenticate();
        return data;
    }

    async authenticate() {
        throw new Error("AuthenticateBehavior needs an authenticate method");
    }
}

class PassportAuthenticateBehavior extends AuthenticateBehavior {
    constructor(user, authData) {
        super(user, authData);
    }

    async do() {
        const user = this.user;
        const {password} = this.authData;

        const compare = await bcrypt.compare(password, user.password);
        if(!compare) {
            return {
                error: {
                    code: 401,
                    message: "Incorrect Email / Password combination"
                }
            }
        }

        return compare;
    }
}

module.exports = {
    PassportAuthenticateBehavior
}