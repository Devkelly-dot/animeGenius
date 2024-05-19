const { CreateJWTTokenService } = require("../../createTokenService/createTokenService");

class PostRegisterBehavior {
    constructor(user) {
        this.user = user;
    }

    async do() {
        const newUser = await this.doPost();
        return newUser;
    }

    async doPost() {
        throw new Error("PostRegisterBehavior needs a doPost method")
    }
}

class PostRegisterGenerateToken extends PostRegisterBehavior {
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
    PostRegisterGenerateToken
}