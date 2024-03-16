const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    attributes: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    ratings_count: {
      type: Number,
      required: true,
    },
    price_per_night: {
      type: Number,
      required: true,
    },
    taxes_and_fees: {
      type: Number,
      required: true,
    },
    emi_option: {
      type: String,
      required: true,
    },
    special_offer: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    collection: 'Hotel',
  },
);

module.exports = mongoose.model('Hotel', hotelSchema);
