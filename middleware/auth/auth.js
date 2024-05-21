const passport = require("passport");

class AuthService {
    constructor() {}

    async do(req, res, next) {
        throw new Error('Method not implemented');
    }
}

class RequiredAuthService extends AuthService {
    async do(req, res, next) {
        passport.authenticate('bearer', { session: false }, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}

class OptionalAuthService extends AuthService {
    async do(req, res, next) {
        passport.authenticate('bearer', { session: false }, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (user) {
                req.user = user;
            }
            next();
        })(req, res, next);
    }
}

module.exports = { RequiredAuthService, OptionalAuthService };