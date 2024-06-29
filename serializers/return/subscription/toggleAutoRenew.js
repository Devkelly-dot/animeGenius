const { BaseReturnSerializer } = require("../base/baseReturnSerializer");

class ToggleAutoRenewSerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            'updateData'
        ]
    }
}

module.exports = {
    ToggleAutoRenewSerializer
}