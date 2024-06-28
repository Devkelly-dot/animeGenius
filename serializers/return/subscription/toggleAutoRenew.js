const { BaseReturnSerializer } = require("../base/baseReturnSerializer");

class ToggleAutoRenewSerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            'data'
        ]
    }
}

module.exports = {
    ToggleAutoRenewSerializer
}