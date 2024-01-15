const User = require("../models/userModel");

exports.me = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json(user);
};
