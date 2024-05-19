const User = require("../../../db/models/User");

class GetUserBehavior {
    constructor(data) {
        this.data = data;
    }

    async do() {
        const user = await this.getUser();
        return user;
    }

    async getUser() {
        throw new Error("GetUserBehavior needs a getUser method");
    }
}

class GetUserByEmailBehavior extends GetUserBehavior {
    constructor(data) {
        super(data);
    }

    async getUser() {
        if(!this.data?.email) {
            throw new Error("GetUserByEmailBehavior's data needs an email property.");
        }
        const user = await User.findOne({
            email: this.data?.email
        });
        
        if(user) {
            return user;
        }

        return {
            error: {
                code: 404,
                message: "No user found"
            }
        }
    }
}

module.exports = {
    GetUserByEmailBehavior
}