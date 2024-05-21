const { BaseReturnSerializer } = require("../base/baseReturnSerializer");

class PopularAnimeSerializer extends BaseReturnSerializer {
    constructor(data) {
        super(data);

        this.fields = [
            'title',
            'picture_url',
            'myanimelist_url',
            'score',
            'rank',
            'aired_on'
        ]
    }
}

module.exports = {
    PopularAnimeSerializer
}