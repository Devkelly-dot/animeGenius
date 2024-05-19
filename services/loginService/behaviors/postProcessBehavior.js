const { CreateJWTTokenService } = require("../../createTokenService/createTokenService");

class PostProcessBehavior {
    constructor(user) {
        this.user = user;
    }

    async do() {
        const newUser = await this.doPost();
        return newUser;
    }

    async doPost() {
        throw new Error("PostProcessBehavior needs a doPost method");
    }
}

class TokenPostLoginBehavior extends PostProcessBehavior {
    constructor(user) {
        super(user);
    }

    async doPost() {
        const tokenService = new CreateJWTTokenService(this.user);
        const token = await tokenService.do();
        this.user.token = token;
        return this.user;
    }
}

module.exports = {
    TokenPostLoginBehavior
}