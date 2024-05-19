const crypto = require('crypto');
const secretOrKey = crypto.randomBytes(64).toString('hex');
console.log(secretOrKey);