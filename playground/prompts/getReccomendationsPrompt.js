const anime = 'One Piece';
const reason = 'I like the adventuring and the pirates';
const max = 3;
const getReccsPrompt = `
    The user likes ${anime}. 
    their reasoning for liking it is: 
    ${reason}

    please respond with a list of 1 - ${max} recommendations in the following JSON format: 

    {
        recommendations: {
            title: <string>, // title of the anime
            reason: <string> // why the user would like this anime
        }[]
    }
`

module.exports = getReccsPrompt;