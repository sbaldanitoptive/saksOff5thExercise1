global.appRoot = __dirname;
const express = require('express');
const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const config = require('./src/config/');
const dbService = require('./src/services/db.service');
const authMiddleware = require('./src/policies/auth.policy');
const AuthController = require('./src/controllers/AuthController');
const ProductController = require('./src/controllers/ProductController');
const ImageController = require('./src/controllers/ImageController');

app.use(
  logger(
    ':date[iso] :method :url :status :response-time ms - content-length :res[content-length]\n'
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
// Serve static files from storage/ dir
app.use(express.static('storage'));

// Set up Swagger for API Documentation
// Ref: https://swagger.io/docs/specification/about/
const swaggerDocument = require('./swagger.json');
const specs = swaggerJsdoc(swaggerDocument);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Establish connection with Database
const environment = process.env.NODE_ENV || 'development';
const DB = dbService(environment, config.migrate).start();

// Define routes and controllers
app.get('/', function (req, res) {
  // TODO: Add default view
  res.send('Hello World');
});

// Auth flow routes
app.post('/login', AuthController.login);
app.get('/auth-data', authMiddleware, AuthController.authData);
app.get('/logout', authMiddleware, AuthController.logout);

// List/Create Products routes
app.get('/products', authMiddleware, ProductController.getAll);
app.post('/products', authMiddleware, ProductController.create);
app.post('/products-import', authMiddleware, ProductController.bulkImport);
app.post('/images', authMiddleware, ImageController.create);

// Create Orders routes
app.post('/orders', authMiddleware, (req, res) => {});

// Spin up server
app.listen(config.port, () => {
  console.log('app listening on port:', config.port);
  return DB;
});
