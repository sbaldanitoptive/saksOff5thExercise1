const User = require('../models/User');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

function AuthController() {
  const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: 'Bad Request: Email or password is wrong' });
    }
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ msg: 'Bad Request: User not found' });
      }
      const { password: userPassword, ...userNoPassword } = user.toJSON();
      if (bcryptService().comparePassword(password, userPassword)) {
        const token = authService().issue({ id: user.id });
        return res.status(200).json({ token, user: userNoPassword });
      }

      return res.status(401).json({ msg: 'Unauthorized' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    login,
  };
}

module.exports = new AuthController();
