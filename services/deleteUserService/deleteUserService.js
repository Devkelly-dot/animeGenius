const { VerifyUserBehavior } = require("./verifyUserBehavior/verifyUserBehavior");
const { DeleteUserBehavior } = require("./verifyUserBehavior/deleteUserBehavior");

class DeleteUserService {
    constructor(config) {
        this.config = config;

        this.verifyUserBehavior = VerifyUserBehavior;
        this.deleteUserBehavior = DeleteUserBehavior;
    }

    async do() {
        const verifyUserBehavior = new this.verifyUserBehavior(this.config);
        const verifyData = await verifyUserBehavior.do();
        if(verifyData?.error) {
            return verifyData;
        }

        const deleteUserBehavior = new this.deleteUserBehavior(this.config);
        const deleteData = await deleteUserBehavior.do();
        return deleteData;
    }
}

module.exports = {
    DeleteUserService
}