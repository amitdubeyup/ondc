const moment = require('moment');
const BookingModal = require('../modals/booking');
const HotelModal = require('../modals/hotel');
const ObjectId = require('mongoose').Types.ObjectId;

const bookHotel = async (req, res) => {
  try {
    if (!moment(req.body.check_in_date).isBefore(req.body.check_out_date)) {
      throw new Error('Check-out date must be greater than check-in date.');
    }
    if (moment(req.body.check_in_date).isSame(req.body.check_out_date)) {
      throw new Error('Check-in date & check-out date can not be the same.');
    }
    const hotel_found = await HotelModal.findOne({ _id: new ObjectId(req.body.hotel_id) });
    if (!hotel_found) {
      throw new Error('Hotel details were not found for the provided hotel id.');
    }
    const payload = {
      ...req.body,
      hotel_id: new ObjectId(req.body.hotel_id),
      user_id: new ObjectId(req.auth._id),
      status: 'confirmed',
    };
    const result = await new BookingModal(payload).save();
    return res.send({
      success: true,
      message: `Booking completed successfully.`,
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error?.message ?? 'Technical error, please try again.',
    });
  }
};

const viewBooking = async (req, res) => {
  try {
    const query = {
      _id: new ObjectId(req.body.booking_id),
      user_id: new ObjectId(req.auth._id),
    };
    const result = await BookingModal.findOne(query);
    if (!result) {
      throw new Error('Booking details were not found for the provided id.');
    }
    return res.send({
      success: true,
      message: 'Booking fetched successfully.',
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error?.message ?? 'Technical error, please try again.',
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const query = {
      _id: new ObjectId(req.body.booking_id),
      user_id: new ObjectId(req.auth._id),
    };
    const result = await BookingModal.findOneAndUpdate(query, { $set: { status: 'cancelled', cancelled_date: new Date() } }, { new: true });
    if (!result) {
      throw new Error('Unable to cancel the booking, either the booking id is wrong or the booking does not exist.');
    }
    return res.send({
      success: true,
      message: 'Booking cancelled successfully.',
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error?.message ?? 'Technical error, please try again.',
    });
  }
};

module.exports = {
  bookHotel,
  viewBooking,
  cancelBooking,
};
