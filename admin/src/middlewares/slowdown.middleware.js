import { slowDown } from 'express-slow-down';

const rateSlowDown = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 10,
    delayMs: (hits) => hits * 200,
    maxDelayMs: 5000,
});

export default rateSlowDown;