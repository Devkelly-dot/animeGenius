class BasePermissionClass {
    constructor(data) {
        this.data = data;
    }

    async checkPermission() {
        throw new Error("BasePermissionClass needs a checkPermissionClass");
    }
}

module.exports = {
    BasePermissionClass
}