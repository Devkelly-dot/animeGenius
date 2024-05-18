const { RapidAPIStreamingAvailRequestSender } = require("../services/rapidApiService/rapidApiService");

async function main() {
    const endpoint = 'search/title';
    const params = {
        title: 'Black Clover',
        country: 'us',
        show_type: 'all'
    }

    const config = {
        endpoint,
        params
    }

    const getRapidStreamingAvailability = new RapidAPIStreamingAvailRequestSender(config);

    try {
        const res = await getRapidStreamingAvailability.do();
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

main();