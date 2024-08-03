const { PassportAuthenticateBehavior } = require("../../loginService/behaviors/authenticateBehavior");

class VerifyUserBehavior {
    constructor(config) {
        this.config = config;
    }

    async do() {
        const user = this.config.user;
        const password = this.config.password;

        const passportAuthenticateBehavior = new PassportAuthenticateBehavior(user, {password});
        const data = await passportAuthenticateBehavior.do();

        if(data.error) {
            return {
                error: {
                    message: "Incorrect password",
                    code: 401
                }
            }
        }
        return data;
    }
}

module.exports = {
    VerifyUserBehavior
}