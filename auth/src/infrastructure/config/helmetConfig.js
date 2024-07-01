const helmet = require('helmet');

const helmetOptions = (app) => {
    app.use(helmet());
    app.use(helmet.contentSecurityPolicy({
        directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "ramselvin.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
        }
    }));
    app.use(helmet.dnsPrefetchControl({ allow: false }));
    app.use(helmet.expectCt({ enforce: true, maxAge: 30 }));
    app.use(helmet.frameguard({ action: 'deny' }));
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));
    app.use(helmet.noSniff());
    app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
    app.use(helmet.xssFilter());
};

module.exports = helmetOptions;
