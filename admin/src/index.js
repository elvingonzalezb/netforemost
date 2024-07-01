import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import csurf from 'csurf';
import swaggerUi from 'swagger-ui-express';
import rateSlowDown from './middlewares/slowdown.middleware.js';
import repositoryRoutes from './routes/repository.route.js';
import swaggerDocs from './config/swagger.config.js';
import corsOptions from './config/cors.config.js';
import articlesRoutes from './routes/articleRoute.js'
import compressionConfig from './config/compression.config.js';
import { connectToDatabase } from './database/connection.js'

const app = express();
const port = 4000;

app.use(cors({
  origin: 'http://ramselvin.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(compression(compressionConfig));

app.use('/admin/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.get('/', rateSlowDown, (req, res) => { 
  res.status(200).send('Main Admin API');
});
app.use('/admin/articles', articlesRoutes);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Service Admin node listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error: to Database:', err);
  });


