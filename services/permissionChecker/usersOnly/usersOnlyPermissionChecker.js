const { UsersOnlyPermissionClass } = require("../../permissionClass/usersOnly/usersOnly");
const { BasePermissionChecker } = require("../base/basePermissionChecker");

class UsersOnlyPermissionChecker extends BasePermissionChecker {
    constructor(data) {
        super(data);
        this.permissionClass = UsersOnlyPermissionClass;
    }
} 

module.exports = {
    UsersOnlyPermissionChecker
}