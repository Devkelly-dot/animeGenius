class checkPermissionBehavior {
    constructor(config) {
        this.config = config;
    }

    async do() {
        const permission = await this.checkPermission();
        return permission;
    }

    async checkPermission() {
        throw new Error("checkPermissionBehavior needs a checkPermission method");
    }
}

class CheckUserSubscription extends checkPermissionBehavior {
    constructor(config) {
        super(config);
    }

    async checkPermission() {
        const { user } = this.config;

        if(!user) {
            return {
                error: {
                    code: 401,
                    message: "Must be logged in"
                }
            }
        }

        return {
            success: "User has a subscription"
        }
    }
}

module.exports = {
    CheckUserSubscription
}