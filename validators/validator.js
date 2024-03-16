const { check, validationResult } = require('express-validator');

const validate = async (req, validations) => {
  for (let validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return true;
  } else {
    const error = errors?.errors?.length ? errors?.errors?.map((el) => el.msg).join(' ') : 'Unknown error, please try again.';
    throw new Error(error);
  }
};

const checkRegister = async (req, res, next) => {
  try {
    await validate(req, [
      check('name').notEmpty().withMessage('Name is required.'),
      check('email').notEmpty().withMessage('Email address is required.').isEmail().withMessage('Email address is invalid.'),
      check('mobile').notEmpty().withMessage('Mobile number is required.').isInt({ min: 1000000000, max: 9999999999 }).withMessage('Mobile number must be 10 digits.'),
      check('password').notEmpty().withMessage('Password is required.').isLength({ min: 6 }).withMessage('Password length must be 6 characters long.'),
    ]);
    next();
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error?.message ?? 'Unknown error, please try again.',
    });
  }
};

const checkLogin = async (req, res, next) => {
  try {
    await validate(req, [
      check('email').notEmpty().withMessage('Email address is required.').isEmail().withMessage('Email address is invalid.'),
      check('password').notEmpty().withMessage('Password is required.').isLength({ min: 6 }).withMessage('Password length must be 6 characters long.'),
    ]);
    next();
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error?.message ?? 'Unknown error, please try again.',
    });
  }
};

const checkBooking = async (req, res, next) => {
  try {
    await validate(req, [
      check('hotel_id').notEmpty().withMessage('Hotel id is required.').isLength({ min: 24 }).withMessage('Hotel id is invalid.'),
      check('guest_address').notEmpty().withMessage('Guest address is required.'),
      check('check_in_date').notEmpty().withMessage('Check-in date is required.').isISO8601('yyyy-mm-dd').toDate().withMessage('Check in date is invalid.'),
      check('check_out_date').notEmpty().withMessage('Check-out date is required.').isISO8601('yyyy-mm-dd').toDate().withMessage('Check-out date is invalid'),
      check('total_price').notEmpty().withMessage('Total price is required.').isInt({ min: 0 }).withMessage('Total price can not be less than zero.'),
      check('number_of_guests').notEmpty().withMessage('Number of guests is required.').isInt({ min: 1 }).withMessage('Number of guests must be greater than zero.'),
    ]);
    next();
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error?.message ?? 'Unknown error, please try again.',
    });
  }
};

const checkBookingID = async (req, res, next) => {
  try {
    await validate(req, [check('booking_id').notEmpty().withMessage('Booking id is required.').isLength({ min: 24 }).withMessage('Booking id is invalid.')]);
    next();
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error?.message ?? 'Unknown error, please try again.',
    });
  }
};

module.exports = { checkRegister, checkLogin, checkBooking, checkBookingID };
