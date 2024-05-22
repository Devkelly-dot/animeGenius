const { BaseReturnSerializer } = require("../base/baseReturnSerializer");

class RecommendationsSerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            'recommendations',
            'chargeData'
        ]
    }
}

module.exports = {
    RecommendationsSerializer
}