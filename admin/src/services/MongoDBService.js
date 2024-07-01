import { connectToDatabase } from '../database/connection.js';

class MongoDBService {
    constructor(model) {
        this.model = model;
    }

    connect = async () => {
        await connectToDatabase();
    };

    findAll = async () => {
        return await this.model.find({});
    };

    findById = async (id) => {
        return await this.model.findById(id).exec();
    };

    findOne = async (query) => {
        return await this.model.findOne(query).exec();
    };
}

export default MongoDBService;


