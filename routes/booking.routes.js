const Express = require('express');
const Router = Express.Router();
const AuthGuard = require('../middleware/auth');
const Controller = require('../controllers/booking');
const { checkBooking, checkBookingID } = require('../validators/validator');

Router.post('/save', checkBooking, AuthGuard, async (req, res) => {
  try {
    await Controller.bookHotel(req, res);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error?.message ?? 'Internal server error. Please try again later.',
    });
  }
});

Router.post('/view', checkBookingID, AuthGuard, async (req, res) => {
  try {
    await Controller.viewBooking(req, res);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error?.message ?? 'Internal server error. Please try again later.',
    });
  }
});

Router.post('/cancel', checkBookingID, AuthGuard, async (req, res) => {
  try {
    await Controller.cancelBooking(req, res);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error?.message ?? 'Internal server error. Please try again later.',
    });
  }
});

module.exports = Router;
