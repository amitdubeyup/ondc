const HotelModal = require('../modals/hotel');

const searchHotel = async (req, res) => {
  try {
    let query = {};
    if (req.query && req.query.name) {
      query['$or'] = [
        {
          name: { $regex: new RegExp(req.query.name, 'i') },
        },
        {
          location: { $regex: new RegExp(req.query.name, 'i') },
        },
      ];
    }
    const limit = req.query && req.query.limit ? parseInt(req.query.limit) : 10;
    const skip = req.query && req.query.skip ? parseInt(req.query.skip) : 0;

    if (isNaN(limit) || isNaN(skip) || limit <= 0 || skip < 0) {
      throw new Error('Invalid limit or skip value.');
    }

    const result = await HotelModal.find(query)
      .limit(limit + 1)
      .skip(skip * limit);

    const have_prev = skip > 0;
    const have_next = result.length > limit;

    if (result.length > limit) {
      result.pop();
    }

    return res.send({
      success: true,
      message: 'Hotels fetched successfully.',
      have_prev,
      have_next,
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
  searchHotel,
};
