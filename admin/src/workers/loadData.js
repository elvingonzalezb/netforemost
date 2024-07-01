import fs from 'fs';
import path from 'path';
import ArticleService from '../services/articlesService.js';

const filePath = new URL('../config/data.json', import.meta.url).pathname;
const absolutePath = path.resolve(filePath);

const loadData = async () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const articles = JSON.parse(data);
        console.log(`Loaded ${articles.length} articles from ${filePath}`);

        await ArticleService.insertArticles(articles);
        console.log('Articles inserted successfully');
    } catch (error) {
        console.error(`Error loading data: ${error.message}`);
    }
};

export default loadData;
