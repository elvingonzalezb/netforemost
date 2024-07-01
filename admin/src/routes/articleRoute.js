import express from 'express';
import mainRatelimiter from '../middlewares/ratelimit.middleware.js';
import rateSlowDown from '../middlewares/slowdown.middleware.js';
import { articleController } from '../controllers/articleController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API for articles
 */

/**
 * @swagger
 * /admin/articles:
 *   get:
 *     summary: Get the articles of company NetForemost
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   author:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   url:
 *                     type: string
 *                   urlToImage:
 *                     type: string
 *                   publishedAt:
 *                     type: date
 */
router.get('/', articleController.getAllArticles);

/**
 * @swagger
 * /admin/articles/health:
 *   get:
 *     summary: Check health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Check state health
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Check health
 */
router.get('/health', mainRatelimiter, (req, res) => { 
    res.status(200).json({'status': 'Check health'});
});

/**
 * @swagger
 * /admin/articles/slow:
 *   get:
 *     summary: Testing slow limit request
 *     tags: [Testing]
 *     responses:
 *       200:
 *         description: Testing slow limit request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Testing slow limit request
 */
router.get('/slow', rateSlowDown, (req, res) => {
    res.status(200).json({'status': 'Testing slow limit request'});
});

/**
 * @swagger
 * /admin/articles/load:
 *   post:
 *     summary: Load data json
 *     tags: [Load]
 *     responses:
 *       200:
 *         description: Load data json
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Load data json
 */
router.post('/load', mainRatelimiter, articleController.uploadJsonFile);

export default router;

