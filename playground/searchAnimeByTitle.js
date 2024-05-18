const { SearchRapidApiByTitle } = require("../services/searchAnimeService/searchAnimeService");

async function main() {
    const config = {
        title: 'One Punch Man'
    }
    const searchAnimeService = new SearchRapidApiByTitle(config);
    const data = await searchAnimeService.do();
    console.log(data);
}

main();