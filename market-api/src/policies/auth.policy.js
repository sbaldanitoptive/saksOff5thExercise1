const authService = require('../services/auth.service');

module.exports = async (req, res, next) => {
  // Token may be provided by cookies or body param
  const tokenToVerify = req.cookies.access_token || req.body.token;

  if (!tokenToVerify) {
    return res.status(401).json({ msg: 'No Authorization was found' });
  }

  return authService().verify(tokenToVerify, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ err });
    }

    // Add token data in current request
    req.loggedUser = decodedToken;

    return next();
  });
};
