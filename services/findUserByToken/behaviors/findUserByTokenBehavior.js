const User = require("../../../db/models/User");
const jwt = require('jsonwebtoken');

require('dotenv').config();

class FindUserByTokenBehavior {
    constructor(config) {
        this.config = config;
    }
}

class FindUserByBearerTokenId extends FindUserByTokenBehavior {
    constructor(config) {
        super(config);
    }

    async do() {
        const { token } = this.config;
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded._id);

            if (!user) {
                return null;
            }

            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = {
    FindUserByBearerTokenId
}