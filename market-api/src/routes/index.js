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

  res.render('productsList', { ...mainProps, products });
};
