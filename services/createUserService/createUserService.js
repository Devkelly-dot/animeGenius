const { CreateRegularUserBehavior } = require("./behaviors/createBehavior");

class CreateUserService {
    constructor(userConfig) {
        this.userConfig = userConfig;

        this.createBehavior = null;
    }

    async do() {
        const createBehavior = new this.createBehavior(this.userConfig);
        const user = await createBehavior.do();
        return user;
    }
}

class CreateUserFromForm extends CreateUserService {
    constructor(userConfig) {
        super(userConfig)

        this.createBehavior = CreateRegularUserBehavior;
    }
}

module.exports = {
    CreateUserFromForm
}