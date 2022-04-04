const bcrypt = require('bcrypt-nodejs');

const bcryptService = () => {
  const password = (userOrPassword) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(
      typeof userOrPassword === 'object'
        ? userOrPassword.password
        : userOrPassword,
      salt
    );

    return hash;
  };

  const comparePassword = (pw, hash) => bcrypt.compareSync(pw, hash);

  return {
    password,
    comparePassword,
  };
};

module.exports = bcryptService;
