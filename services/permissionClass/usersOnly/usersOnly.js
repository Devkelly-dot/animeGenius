const { BasePermissionClass } = require("../base/basePermissionClass");

class UsersOnlyPermissionClass extends BasePermissionClass {
    constructor(data) {
        super(data);
    }

    async checkPermission() {
        if (!this.data?.user) {
            return {
                error: {
                    code: 401,
                    message: "You are not logged in. Please log in to continue."
                }
            };
        }

        return true;
    }
}

module.exports = {
    UsersOnlyPermissionClass
}