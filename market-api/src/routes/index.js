exports.index = function (req, res) {
  const loggedUser = req.loggedUser;
  if (!loggedUser) {
    return res.render('login');
  }
  res.render('index', { name: loggedUser.email });
};
