const passport = require('passport');
const { FindUserByBearerToken } = require('./services/findUserByToken/findUserByTokenService');
const BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new BearerStrategy(
    async function(token, done) {
        try {
            const findUserByBearerToken = new FindUserByBearerToken({ token });
            const user = await findUserByBearerToken.do();
            
            if (!user) {
                return done(null, false);
            }
            return done(null, user, { scope: 'all' });
        } catch (error) {
            return done(error);
        }
    }
));

module.exports = passport;
