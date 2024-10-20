const swaggerJSDoc = require('swagger-jsdoc');

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Online Bidding System API',
      version: '1.0.0',
      description: 'API for the Online Bidding System',
    },
    servers: [
      {
        url: 'https://online-biding-system.onrender.com', // Replace with your API URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your API files
};

// Generate the Swagger specification
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
