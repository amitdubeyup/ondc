const Express = require('express');
const Router = Express.Router();

const userRoutes = require('./user.routes');
const hotelRoutes = require('./hotel.routes');
const bookingRoutes = require('./booking.routes');

Router.use('/user', userRoutes);
Router.use('/hotel', hotelRoutes);
Router.use('/booking', bookingRoutes);

module.exports = Router;
