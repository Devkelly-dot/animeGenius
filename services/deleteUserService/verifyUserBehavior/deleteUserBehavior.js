const User = require("../../../db/models/User");

class DeleteUserBehavior {
    constructor(config) {
        this.config = config;
    }

    async do() {
        const data = await User.deleteOne({
            _id: this.config.user._id,
        });
        return data;
    }
}

module.exports = {
    DeleteUserBehavior
}