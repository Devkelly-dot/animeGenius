const { GenerateJWTTokenBehavior } = require("./behaviors/generateTokenBehavior");

class CreateTokenService {
    constructor(data) {
        this.data = data;

        this.generateTokenBehavior = null;
    }

    async do() {
        const generateTokenBehavior = new this.generateTokenBehavior(this.data);
        const token = await generateTokenBehavior.do();
        return token;
    }
}

class CreateJWTTokenService extends CreateTokenService {
    constructor(data) {
        super(data);

        this.generateTokenBehavior = GenerateJWTTokenBehavior;
    }
}

module.exports = {
    CreateJWTTokenService
}