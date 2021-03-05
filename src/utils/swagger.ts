import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'A robot process automation demo', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'REST API for a robot process automation demo', // short description of the app
  },
  servers: [
    { url: 'https://robot-process-automation-demo.herokuapp.com', description: 'Deployed server on Heroku' },
    { url: 'http://localhost:5000/', description: 'Local development/testing server' },
  ],
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yml'],
};
// initialize swagger-jsdoc
export default {
  setup: swaggerUI.setup(swaggerJSDoc(options)),
  serve: swaggerUI.serve,
};
