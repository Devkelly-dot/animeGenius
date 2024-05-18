const User = require("../../../db/models/User");

class CreateUserBehavior {
    constructor(userConfig) {
        this.userConfig = userConfig;
    }

    async do() {
        if(!this.userConfig) {
            throw new Error("CreateUserBehavior needs to be instantiated with a userConfig");
        }

        const user = await this.create();
        return user;
    }

    async create() {
        throw new Error("CreateUserBehavior needs a create method");
    }
}

class CreateRegularUserBehavior extends CreateUserBehavior {
    constructor(userConfig) {
        super(userConfig);
    }

    async create() {
        if(!this.userConfig.email || !this.userConfig.password) {
            throw new Error("CreateRegularUserBehavior's config must have email and password properties");
        }
        const user = await User.create(this.userConfig);
        return user;
    }
}

module.exports = {
    CreateRegularUserBehavior
}