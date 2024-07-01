import { ClientError } from '../utils/errors.js';
import MongoDBService from '../services/MongoDBService.js';
import Article from '../models/articleModel.js';

class ArticleService extends MongoDBService {
    constructor() {
        super(Article);
    }

    async getAllArticles() {
        await this.connect();
        const articles = await this.findAll();
        if (!articles) throw new ClientError('No articles found', 400);
        return articles;
    }

    async getArticleById(id) {
        await this.connect();
        const article = await this.findById(id);
        if (!article) throw new ClientError('No document found with that ID', 400);
        return article;
    }

    async getArticlesByName(name) {
        await this.connect();
        const articles = await this.findOne({ name });
        if (!articles || articles.length === 0) throw new ClientError('No document found with that name', 400);
        return articles;
    }

    async insertArticles(articles) {
        try {
            await this.connect();
            const insertedArticles = await this.model.insertMany(articles);
            return insertedArticles;
        } catch (error) {
            throw new Error(`Error inserting articles: ${error.message}`);
        }
    }
}

export default new ArticleService();




