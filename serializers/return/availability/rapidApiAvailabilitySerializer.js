const { BaseReturnSerializer } = require("../base/baseReturnSerializer");

class RapidApiAvailabilitySerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            'title',
            'type',
            'overview',
            'streamingInfo',
            'genres',
        ]
    }
}

module.exports = {
    RapidApiAvailabilitySerializer
}