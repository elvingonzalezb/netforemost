import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Ramselvin - Admin',
            version: '1.0.0',
            description: 'Explore the API endpoints for the articles',
            contact: {
                name: 'ramselvin',
            },
        },
        servers: [
            {
                url: 'http://admin.ramselvin.com',
                description: 'Documentación de APIs para el servicio articulos',
            },
        ],
    },
    apis: ['./routes/*.js', './services/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
