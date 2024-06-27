require('dotenv').config()
const jwt = require('jsonwebtoken');

class GenerateTokenBehavior {
    constructor(data) {
        this.data = data;
    }

    async do() {
        const token = await this.generate();
        return token;
    }

    async generate() {
        throw new Error("GenerateTokenBehavior needs a generate function");
    }
}

class GenerateJWTTokenBehavior extends GenerateTokenBehavior {
    constructor(data) {
        super(data);
        this.fields = [
            '_id',
            'email',
            'username'
        ];

        this.expiresIn = '1w';
    }

    async generate() {
        let payload = {};
        this.fields.forEach((f)=>{
            payload[f] = this.data[f];
        });

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: this.expiresIn });
        return token;
    }
}

module.exports = {
    GenerateJWTTokenBehavior
}