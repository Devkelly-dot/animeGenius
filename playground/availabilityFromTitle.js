const { RapidAPIAnimeTitleAvailabilityService } = require("../services/animeAvailabilityService/animeAvailabilityService");

async function main() {
    const config = {
        title: 'Black Clover'
    }
    const rapidAPIAnimeTitleAvailabilityService = new RapidAPIAnimeTitleAvailabilityService(config);
    const res = await rapidAPIAnimeTitleAvailabilityService.do();
    console.log(res);
}

main();