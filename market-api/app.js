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
const OrderController = require('./src/controllers/OrderController');

app.use(
  logger(
    ':date[iso] :method :url :status :response-time ms - content-length :res[content-length]\n'
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
// Serve static files from storage/ dir
app.use(express.static('storage'));

// Set up Swagger for API Documentation
// Ref: https://swagger.io/docs/specification/about/
const swaggerDocument = require('./swagger.json');
const specs = swaggerJsdoc(swaggerDocument);
const apiDocsRoute = '/api-docs';
app.use(apiDocsRoute, swaggerUi.serve, swaggerUi.setup(specs));

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
app.get('/images', authMiddleware, ImageController.getAll);
app.post('/images', authMiddleware, ImageController.create);

// List/Create Orders routes
app.get('/orders', authMiddleware, OrderController.getAll);
app.post('/orders', authMiddleware, OrderController.create);

// Spin up server
app.listen(config.port, () => {
  console.log('app listening on port:', config.port);
  console.log(
    'API Docs are available at:',
    `http://${config.hostname}:${config.port}${apiDocsRoute}`
  );
  return DB;
});
