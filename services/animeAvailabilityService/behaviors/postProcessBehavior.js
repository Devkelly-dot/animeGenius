class AnimeAvailabilityPostProcessBehavior {
    constructor(data, res) {
        this.data = data;
        this.res = res;
    }

    async do() {
        if(!this.res) {
            throw new Error("AnimeAvailabilityPostProcessBehavior needs to be instantiated with a res object");
        }

        const data = await this.process();
        return data;
    }

    async process() {
        throw new Error("AnimeAvailabilityPostProcessBehavior needs a process method");
    }
}

class AnimeAvailabilityFilterByTitle extends AnimeAvailabilityPostProcessBehavior {
    constructor(data, res) {
        super(data, res);
    }

    async process() {
        const result = this.res?.result;
        const filtered = result?.find((i)=>this.filter(i));
        return filtered;
    }

    filter(item) {
        const data = this.data;
        const genres = item?.genres;
        const is_animation = genres?.find((g)=>g?.name?.toLowerCase()==='animation')

        if(!is_animation) {
            return false;
        }
        
        if(!data?.title) {
            throw new Error("AnimeAvailabilityFilterByTitle's data needs a title entry");
        }

        if(item?.title?.toLowerCase()?.includes(data?.title?.toLowerCase())) {
            return true;
        } 

        if(item?.originalTitle?.toLowerCase()?.includes(data?.title?.toLowerCase())) {
            return true;
        } 

        return false;
    }
}

module.exports = {
    AnimeAvailabilityFilterByTitle
}