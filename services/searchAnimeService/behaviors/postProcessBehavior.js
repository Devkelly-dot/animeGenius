class ConvertToSerializerBehavior {
    constructor(data) {
        this.data = data;
    }

    async do() {
        const formatted = this.data?.map((item)=>{
            const url = item.url;
            const regex = /\/anime\/(\d+)\//;
            const match = url.match(regex);
            let id = 1;
            if (match) {
                id = match[1];
                console.log(id); 
            } else {
                console.log("ID not found");
            }

            return {
                ...item, 
                'picture_url': item.thumbnail,
                'myanimelist_url': item.url,
                'rank': "",
                'aired_on': item.startDate,
                'description': item.shortDescription,
                'myanimelist_id': id,
                'synopsis': item.shortDescription,
                'title_en': item.title,
                'title_ov': null,
                'statistics': null
            }
        })
        return formatted;
    }
}

module.exports = {
    ConvertToSerializerBehavior
}