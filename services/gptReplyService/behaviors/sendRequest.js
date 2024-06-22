class SendRequestBehavior {
    constructor(openai) {
        this.messages = [];
        this.new_message = null;
        this.max_tokens = 500;
        this.openai = openai;
    }

    async do() {
        if(!this.new_message) {
            throw new Error("SendRequestBehavior needs a new_message");
        }

        const reply = await this.send();
        console.log(reply)
        return reply;
    }

    async send() {
        throw new Error("SendRequestBehavior needs a send method");
    }
}

class SendRequestWithGpt35Behavior extends SendRequestBehavior {
    constructor(openai) {
        super(openai);
    }

    async send() {
        let messages = this.messages;
        messages.push(
            {
                role: "user",
                content: this.new_message
            }
        );

        const completion = await this.openai.chat.completions.create({
            messages: messages,
            model: "gpt-3.5-turbo",
            temperature: 0.9,
            max_tokens: this.max_tokens,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
        });

        return completion.choices[0];
    }
}

module.exports = {
    SendRequestWithGpt35Behavior
}