const User = require('../models/User');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: fullcustomer@email.com
 *         password:
 *           type: string
 *           example: fullcustomer
 * tags:
 *   - name: Login
 *     description: Login Form
 */

function AuthController() {
  /**
   * @swagger
   * /:
   *   get:
   *     description: Returns the homepage
   *     responses:
   *       200:
   *         description: hello world
   */

  /**
   * @swagger
   * /login:
   *   post:
   *     description: Login to the application
   *     tags: [Login]
   *     requestBody:
   *       required: true
   *       content:
   *        multipart/form-data:
   *          schema:
   *            $ref: '#/components/schemas/Login'
   *     responses:
   *       200:
   *         schema:
   *           type: object
   */
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
        const token = authService().issue({
          id: user.id,
          email: user.email,
          role: user.role,
        });
        return res
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .redirect('/');
      }

      return res.status(401).json({ msg: 'Unauthorized' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const authData = (req, res) => {
    return res.status(200).json({ user: req.loggedUser });
  };

  /**
   * @swagger
   * /logout:
   *   get:
   *     description: Logout from the application
   *     tags: [Login]
   *     responses:
   *       200:
   *         description: OK
   */
  const logout = (req, res) => {
    return res.clearCookie('access_token').redirect('/');
  };

  return {
    login,
    authData,
    logout,
  };
}

module.exports = new AuthController();
