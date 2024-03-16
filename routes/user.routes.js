const Express = require('express');
const Router = Express.Router();
const Controller = require('../controllers/user');
const { checkRegister, checkLogin } = require('../validators/validator');

Router.post('/register', checkRegister, async (req, res) => {
  try {
    await Controller.registerUser(req, res);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error?.message ?? 'Internal server error. Please try again later.',
    });
  }
});

Router.post('/login', checkLogin, async (req, res) => {
  try {
    await Controller.loginUser(req, res);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error?.message ?? 'Internal server error. Please try again later.',
    });
  }
});

module.exports = Router;
