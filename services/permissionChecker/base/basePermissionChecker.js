class BasePermissionChecker {
    constructor(data) {
        this.data = data;
        
        this.permissionClass = null;
    }   

    async do() {
        if(!this.permissionClass) {
            return true;
        }

        const permissionClass = new this.permissionClass(this.data);
        const permissionData = await permissionClass.checkPermission();
        return permissionData;
    }
}

module.exports = {
    BasePermissionChecker
}