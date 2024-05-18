const { ParseResponseToJSON } = require("./behaviors/parseBehavior");
const { SendRequestWithGpt35Behavior } = require("./behaviors/sendRequest");

class GptReplyService {
    constructor(openai) {
        this.new_message = null;
        this.messages = [];
        this.openai = openai;

        this.sendRequestBehavior = null;
        this.postProcessBehavior = null;
    }

    async do() {
        if(!this.sendRequestBehavior) {
            throw new Error("GptReplyService needs a sendRequestBehavior");
        }

        let sendRequestBehavior = new this.sendRequestBehavior(this.openai);
        sendRequestBehavior.messages = this.messages;
        sendRequestBehavior.new_message = this.new_message;

        const res = await sendRequestBehavior.do();
        if(res?.error) {
            return res;
        }

        if(this.postProcessBehavior) {
            const postProcessBehavior = new this.postProcessBehavior(res);
            const data = await postProcessBehavior.do();
            return data;
        }

        return res;
    }

    setMessages(messages) {
        this.messages = messages;
    }

    setNewMessage(message) {
        this.new_message = message;
    }
}

class Gpt35ReplyService extends GptReplyService {
    constructor(openai) {
        super(openai);

        this.sendRequestBehavior = SendRequestWithGpt35Behavior;
    }
}

class Gpt35JsonReplyService extends Gpt35ReplyService {
    constructor(openai) {
        super(openai);

        this.postProcessBehavior = ParseResponseToJSON;
    }
}

module.exports = {
    Gpt35ReplyService,
    Gpt35JsonReplyService
}