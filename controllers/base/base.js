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
                return res.status(businessData?.code).send(businessData?.message);
            }

            const returnSerializer = new this.returnSerializer(businessData);
            const serializedData = await returnSerializer.do();
            if(serializedData?.error) {
                return res.status(serializedData?.code).send(serializedData?.message);
            }

            let code = 200;
            if(serializedData?.res?.code) {
                code = serializedData.res.code;
            }

            return res.status(200).send(serializedData);
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Something went wrong, try again later."})
        }
    }
}

module.exports = {
    BaseController
}