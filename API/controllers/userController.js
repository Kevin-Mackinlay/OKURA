const User = require('../models/User');
const CryptoJS = require('crypto-js'); // Ensure you have this if you're encrypting passwords
const sendEmail = require('../utils/nodemailer');

// Update User
exports.updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userEmail = user.email; // Store the user's email before deleting the record
    await User.findByIdAndDelete(req.params.id);

    // Send an email after successful deletion
    sendEmail(userEmail, 'Account Deletion Notification', 'Your account has been permanently deleted from our system. If this was not authorized by you, please contact our support team.');

    res.status(200).json('User deleted');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// Get Single User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};

// Get User Stats
exports.getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([{ $match: { createdAt: { $gte: lastYear } } }, { $project: { month: { $month: '$createdAt' } } }, { $group: { _id: '$month', total: { $sum: 1 } } }]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.uploadProfileImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { profileImg: req.file.path }, // Assuming 'profileImg' is the field in your User model
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Profile image uploaded successfully!',
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to update profile image', error: err });
  }
};
