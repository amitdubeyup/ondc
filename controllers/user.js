const UserModal = require('../modals/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res, next) => {
  try {
    const result = await UserModal.findOne({
      $or: [
        {
          email: req.body?.email,
        },
        {
          mobile: req.body?.mobile,
        },
      ],
    });
    if (result) {
      throw new Error('The user is already registered, please try with a new account.');
    }
    const password = await bcrypt.hash(req.body.password, 10);
    await new UserModal({ ...req.body, password }).save();
    return res.send({
      success: true,
      message: 'User registered successfully.',
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error?.message ?? 'Technical error, please try again.',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await UserModal.findOne({
      $or: [
        {
          email: req.body?.email,
        },
        {
          mobile: req.body?.mobile,
        },
      ],
    });
    if (!result) {
      throw new Error('Account does not exist, please register first.');
    }
    const match = await bcrypt.compare(req.body?.password, result.password);
    if (!match) {
      throw new Error('Password is incorrect, please try again.');
    }
    if (result.status !== 1) {
      throw new Error('Account blocked, Please contact support administrator.');
    }
    const payload = {
      _id: result._id,
      name: result.name,
      email: result.email,
      mobile: result.mobile,
    };
    const token = jwt.sign({ data: payload }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
    return res.send({
      success: true,
      message: 'Logged in successfully.',
      token: token,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error?.message ?? 'Technical error, please try again.',
    });
  }
};

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
};
