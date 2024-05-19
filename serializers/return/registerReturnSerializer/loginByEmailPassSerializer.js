const { BaseReturnSerializer } = require("../base/baseReturnSerializer");

class LoginByEmailPassSerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            'username',
            'email',
            'token',
            '_id'
        ]
    }
}

module.exports = {
    LoginByEmailPassSerializer
}