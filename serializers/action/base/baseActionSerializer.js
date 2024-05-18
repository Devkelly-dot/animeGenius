class BaseActionSerializer {
    constructor(req) {
        this.req = req;
    }

    async do() {
        const data = await this.doAction();
        return data;
    }

    async doAction() {
        return this.req;
    }
}

module.exports = {
    BaseActionSerializer
}