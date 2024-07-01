import { rateLimit } from 'express-rate-limit';

const mainRatelimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
});

export default mainRatelimiter;