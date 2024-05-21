const { FindUserByBearerTokenId } = require("./behaviors/findUserByTokenBehavior");

class FindUserByToken {
    constructor(config) {
        this.config = config;
        this.findUserBehavior = null;
    }

    async do() {
        if(!this.findUserBehavior) {
            throw new Error('findUserBehavior not implemented in FindUserByToken');
        }

        const findUserBehavior = new this.findUserBehavior(this.config);
        const user = await findUserBehavior.do();
        return user;
    }
}

class FindUserByBearerToken extends FindUserByToken {
    constructor(config) {
        super(config);
        this.findUserBehavior = FindUserByBearerTokenId;
    }
}

module.exports = {
    FindUserByBearerToken
}