const ProductController = require('../controllers/ProductController');

const mainProps = {
  title: 'Market',
};

exports.index = function (req, res) {
  const loggedUser = req.loggedUser;
  if (!loggedUser) {
    return res.render('login', mainProps);
  }
  mainProps.user = loggedUser;
  res.render('index', mainProps);
};

exports.productsList = async function (req, res) {
  const loggedUser = req.loggedUser;
  mainProps.user = loggedUser;

  const products = await ProductController.getAll(req);

  const { category } = req.query;
  res.render('productsList', {
    ...mainProps,
    products,
    selectedCategory: category,
  });
};

exports.postOrder = function (req, res) {
  const loggedUser = req.loggedUser;
  mainProps.user = loggedUser;

  const { success = 'true' } = req.query;
  res.render('postOrder', { ...mainProps, success: JSON.parse(success) });
};

exports.createProducts = function (req, res) {
  const loggedUser = req.loggedUser;
  mainProps.user = loggedUser;

  res.render('createProducts', { ...mainProps });
};

exports.postProduct = function (req, res) {
  const loggedUser = req.loggedUser;
  mainProps.user = loggedUser;

  const { success = 'true' } = req.query;
  res.render('postProduct', { ...mainProps, success: JSON.parse(success) });
};
