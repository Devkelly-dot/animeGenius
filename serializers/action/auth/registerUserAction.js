const { BasePostSerializer } = require("../base/basePostSerializer");

class RegisterUserAction extends BasePostSerializer {
    constructor(req) {
        super(req);

        this.required_fields = [
            'email',
            'password'
        ]
    }

    async post() {
        
    }
}

module.exports = {
    RegisterUserAction
}