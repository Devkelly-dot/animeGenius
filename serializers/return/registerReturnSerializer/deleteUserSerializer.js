const { BaseReturnSerializer } = require("../base/baseReturnSerializer");

class DeleteUserSerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            'user',
        ]
    }
}

module.exports = {
    DeleteUserSerializer
}