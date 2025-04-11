const { signup } = require('mern-mvc-gen')

const AuthController = {
    signup: signup('User')
};

module.exports = AuthController;