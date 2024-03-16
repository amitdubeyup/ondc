const Express = require('express');
const Router = Express.Router();
const Controller = require('../controllers/hotel');

Router.get('/search', async (req, res) => {
  try {
    await Controller.searchHotel(req, res);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error?.message ?? 'Internal server error. Please try again later.',
    });
  }
});

module.exports = Router;
