class PostProcessor {
    constructor(data) {
        this.data = data;
    }

    async do() {
        const processedData = await this.process();
        return processedData;
    }

    async process() {
        throw new Error('process method not implemented');
    }
}

class PostProcessNothing extends PostProcessor {
    constructor(data) {
        super(data);
    }

    async process() {
        return this.data;
    }
}

module.exports = {
    PostProcessNothing
}