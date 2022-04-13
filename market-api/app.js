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

// Setup view engine
app.set('views', __dirname + '/src/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static('assets'));

// Setup Swagger for API Documentation
// Ref: https://swagger.io/docs/specification/about/
const swaggerDocument = require('./swagger.json');
const specs = swaggerJsdoc(swaggerDocument);
const apiDocsRoute = '/api-docs';
app.use(apiDocsRoute, swaggerUi.serve, swaggerUi.setup(specs));

// Establish connection with Database
const environment = process.env.NODE_ENV || 'development';
const DB = dbService(environment, config.migrate).start();

// Define routes and controllers
const routesMiddleware = authMiddleware(false);
const routes = require('./src/routes');
app.get('/', routesMiddleware, routes.index);
app.get('/products-list', routesMiddleware, routes.productsList);
app.get('/post-order', routesMiddleware, routes.postOrder);

const apiMiddleware = authMiddleware(true);
// Auth flow routes
app.post('/login', AuthController.login);
app.get('/auth-data', apiMiddleware, AuthController.authData);
app.get('/logout', apiMiddleware, AuthController.logout);

// List/Create Products routes
app.get('/products', apiMiddleware, ProductController.getAll);
app.post('/products', apiMiddleware, ProductController.create);
app.post('/products-import', apiMiddleware, ProductController.bulkImport);
app.get('/images', apiMiddleware, ImageController.getAll);
app.post('/images', apiMiddleware, ImageController.create);

// List/Create Orders routes
app.get('/orders', apiMiddleware, OrderController.getAll);
app.post('/orders', apiMiddleware, OrderController.create);

// Spin up server
app.listen(config.port, () => {
  const appUrl = `http://${config.hostname}:${config.port}`;
  console.log('app serving at:', appUrl);
  console.log('API Docs are available at:', `${appUrl}${apiDocsRoute}`);
  return DB;
});
