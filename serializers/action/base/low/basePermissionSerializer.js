const { BaseActionSerializer } = require("./baseActionSerializer");

class BasePermissionSerializer extends BaseActionSerializer {
    constructor(req) {
        super(req);
        this.permissionChecker = null;
    }

    async action() {
        if(this.permissionChecker) {
            const permissionChecker = new this.permissionChecker(this.req);
            const permissionData = await permissionChecker.do();
            if(permissionData.error) {
                return permissionData;
            }
        }
        const data = await this.businessLogic();
        return data;
    }

    async businessLogic() {
        throw new Error("BasePermissionSerializer needs a businessLogic method");
    }
}

module.exports = {
    BasePermissionSerializer
}