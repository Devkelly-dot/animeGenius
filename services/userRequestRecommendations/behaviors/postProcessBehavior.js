class PostProcessBehavior {
    constructor(data) {
        this.data = data;
    }

    async do() {
        const data = await this.postProcess();
        return data;
    }

    async postProcess() {
        throw new Error("PostProcessBehavior needs a postProcess method");
    }
}

class SliceRecommendationsArray extends PostProcessBehavior {
    // make sure we only return whatever the user's subscription allows
    constructor(data) {
        super(data);
    }

    async postProcess() {
        const data = {
            ...this.data,
            recommendations: this.data.recommendations.slice(0, 5)
        }

        return data;
    }
}

module.exports = {
    SliceRecommendationsArray
}