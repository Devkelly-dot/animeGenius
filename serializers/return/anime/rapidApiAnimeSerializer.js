const { BaseReturnSerializer } = require("../base/baseReturnSerializer");

class RapidApiAnimeSerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            'title',
            'picture_url',
            'myanimelist_url',
            'score',
            'rank',
            'aired_on',
            'description'
        ]
    }
}

module.exports = {
    RapidApiAnimeSerializer
}