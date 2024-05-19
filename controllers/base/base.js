class BaseController {
    constructor() {
        this.actionSerializer = null;
        this.returnSerializer = null;
    }

    async do(req, res) {
        try {
            if(!this.actionSerializer) {
                throw new Error("BaseController needs an actionSerializer property");
            }
            if(!this.returnSerializer) {
                throw new Error("BaseController needs an returnSerializer property");
            }
            const actionSerializer = new this.actionSerializer(req);
            const businessData = await actionSerializer.do();
            if(businessData?.error) {
                const error = businessData?.error;
                return res.status(error?.code).send(error?.message);
            }

            const returnSerializer = new this.returnSerializer(businessData);
            const serializedData = await returnSerializer.do();
            if(serializedData?.error) {
                const error = serializedData?.error;
                return res.status(error?.code).send(error?.message);
            }

            let code = 200;
            if(serializedData?.res?.code) {
                code = serializedData.res.code;
            }

            return res.status(code).send(serializedData);
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Something went wrong, try again later."})
        }
    }
}

module.exports = {
    BaseController
}