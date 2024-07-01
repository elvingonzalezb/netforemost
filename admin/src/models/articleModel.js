import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
    {
        author: {
            type: String,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        url: {
            type: String,
        },
        urlToImage: {
            type: String,
        },
        publishedAt: {
            type: Date,
        },
    }, { collection: 'articles'}
);

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
