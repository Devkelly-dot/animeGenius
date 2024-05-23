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
            'description',
            'myanimelist_id',
            'synopsis',
            'title_en',
            'title_ov',
            'statistics'
        ]
    }
}

module.exports = {
    RapidApiAnimeSerializer
}