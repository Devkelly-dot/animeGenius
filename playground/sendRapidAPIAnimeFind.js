const { RapidAPIAnimeRequestSender } = require("../services/rapidApiService/rapidApiService");

async function main() {
    const endpoint = 'search';
    const params = {
        q: 'Black Clover',
        n: '50',
    }

    const config = {
        endpoint,
        params
    }

    const rapidAPIRequestSender = new RapidAPIAnimeRequestSender(config);
    const res = await rapidAPIRequestSender.do();
    console.log(res);
}

main();