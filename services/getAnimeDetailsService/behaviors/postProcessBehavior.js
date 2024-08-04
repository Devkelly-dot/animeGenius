class ConvertToSerializerBehavior {
    constructor(data) {
        this.data = data;
    }

    async do() {
        console.log("========== DATA ========== \n", this.data);
        const item = this.data;

        const formatted = {
            ...item, 
            'picture_url': item.picture,
            'myanimelist_url': `https://myanimelist.net/anime/${item.id}`,
            'rank': item.ranked,
            'aired_on': item.aired,
            'description': item.synopsis,
            'myanimelist_id': item.id,
            'title_en': item.englishTitle,
            'title_ov': item.japaneseTitle,
            'statistics': {
                'score': item.score,
                'ranked': item.ranked,
                'popularity': item.popularity,
                'members': item.members,
                'favorites': item.favorites
            }
        }
        return formatted;
    }
}

module.exports = {
    ConvertToSerializerBehavior
}