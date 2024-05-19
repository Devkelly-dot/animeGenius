const { BaseReturnSerializer } = require("../base/baseReturnSerializer");

class RegisterByEmailSerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            'username',
            'email',
            'token'
        ]
    }
}

module.exports = {
    RegisterByEmailSerializer
}