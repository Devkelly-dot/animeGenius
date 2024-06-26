const { CheckUserHasNoSubscription } = require("./behaviors/checkPermissionBehavior");
const { CreateStripeIntentFromUser } = require("./behaviors/createIntentBehavior");
const { FetchIntentPlanData } = require("./behaviors/dataFetcher");
const { GetOrCreateStripeUserBehavior } = require("./behaviors/getStripeUserData");
const { PostProcessNothing } = require("./behaviors/postProcessor");

class StripePaymentIntentCreator {
    constructor(data) {
        this.data = data;

        this.dataFetcher = FetchIntentPlanData;
        this.checkPermissionBehavior = CheckUserHasNoSubscription;
        this.getStripeUserBehavior = GetOrCreateStripeUserBehavior;
        this.createIntentBehavior = CreateStripeIntentFromUser;
        this.postProcessor = PostProcessNothing;
    }

    async do() {
        const dataFetcher = new this.dataFetcher(this.data);
        let data = await dataFetcher.do();
        data = {...this.data, ...data};
        if(data?.error) {
            return data;
        }

        const checkPermissionBehavior = new this.checkPermissionBehavior(data);
        const permissionData = await checkPermissionBehavior.do();
        if(permissionData?.error){
            return permissionData;
        }

        const getStripeUserBehavior = new this.getStripeUserBehavior(data);
        const stripeUserData = await getStripeUserBehavior.do();
        data = {...data, ...stripeUserData}
        if(stripeUserData?.error) {
            return stripeUser;
        }

        const createIntentBehavior = new this.createIntentBehavior(data);
        const intentData = await createIntentBehavior.do();
        data.intentData = intentData;
        if(intentData?.error) {
            return intentData;
        }

        const postProcessor = new this.postProcessor(data);
        const processedData = await postProcessor.do();
        console.log(processedData);
        return processedData;
    }
}

module.exports = {
    StripePaymentIntentCreator
}