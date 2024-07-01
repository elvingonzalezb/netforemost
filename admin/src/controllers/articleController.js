import ArticleService from '../services/articlesService.js';
import { asyncCatch, response } from '../utils/index.js';
import { HTTP_STATUS } from '../constans/statusCode.js';
import loadDataWorker from '../workers/loadData.js';

const getAllArticles = async (req, res) => {
    const { name } = req.query;
    const articles = name 
        ? await ArticleService.getArticlesByName(name)
        : await ArticleService.getAllArticles();  
    response(res, HTTP_STATUS.CODE_200, articles);  
};

const getArticleById = async (req, res) => {
    const { id } = req.params;
    const article = await ArticleService.getArticleById(id);
    response(res, HTTP_STATUS.CODE_200, article);
};

const uploadJsonFile = async (req, res) => {
    try {
        await loadDataWorker();
        res.status(200).json({ message: 'Data upload process successfully completed' });
    } catch (error) {
        console.error('Error loading data:', error);
        res.status(500).json({ message: 'Failed to initiate data loading process' });
    }
};

export const articleController = {
    getAllArticles: asyncCatch(getAllArticles),
    getArticleById: asyncCatch(getArticleById),
    uploadJsonFile
};

