const { GptRecommendationsService } = require("../recommendationsService/recommendationsService");
const { ChargeUserTotalRequests } = require("./behaviors/chargeUserBehavior");
const { CheckUserSubscription } = require("./behaviors/checkPermissionBehavior");
const { SliceRecommendationsArray } = require("./behaviors/postProcessBehavior");
const { BuildGPTRecommendationConfig } = require("./behaviors/recConfigBuilderBehavior");

class UserRequestRecommendations {
    constructor(config) {
        this.config = config;
        
        this.checkPermissionBehavior = null;
        this.recConfigBuilderBehavior = null;
        this.getRecommendationsBehavior = null;
        this.chargeUserBehavior = null;
        this.postProcessBehavior = null;
    }

    async do() {
        const checkPermissionBehavior = new this.checkPermissionBehavior(this.config);
        const permissionData = await checkPermissionBehavior.do();
        if(permissionData?.error) {
            return permissionData;
        }

        const recConfigBuilder = new this.recConfigBuilderBehavior(this.config);
        const recConfig = await recConfigBuilder.do();

        const getRecommendations = new this.getRecommendationsBehavior(recConfig);
        const recommendations = await getRecommendations.do();

        if(recommendations?.error) {
            return recommendations;
        }

        let return_data = {};
        
        return_data.recommendations = recommendations?.recommendations;

        const chargeUser = new this.chargeUserBehavior(this.config);
        const chargeData = await chargeUser.do();
        
        return_data.chargeData = chargeData;

        const postProcess = new this.postProcessBehavior(return_data);
        return_data = await postProcess.do();

        return return_data;
    }
}

class UserRequestRecommendationsCharged extends UserRequestRecommendations {
    constructor(config) {
        super(config);

        this.checkPermissionBehavior = CheckUserSubscription;
        this.recConfigBuilderBehavior = BuildGPTRecommendationConfig;
        this.getRecommendationsBehavior = GptRecommendationsService;
        this.chargeUserBehavior = ChargeUserTotalRequests;
        this.postProcessBehavior = SliceRecommendationsArray;
    }
}

module.exports = {
    UserRequestRecommendationsCharged
}