const { connect } = require("../db");
const { ResetAllSubscriptionsRequestsService } = require("../services/resetDailyRequests/resetRequestsService");

async function main() {
    await connect();
    const resetAllSubscriptionsRequestsService = new ResetAllSubscriptionsRequestsService();
    await resetAllSubscriptionsRequestsService.do();
}

main();