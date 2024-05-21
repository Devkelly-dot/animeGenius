class BaseActionSerializer {
    constructor(req) {
        this.req = req;
    }

    async do() {
        const data = await this.action();
        return data;
    }

    async action() {
        return this.req;
    }
}

module.exports = {
    BaseActionSerializer
}