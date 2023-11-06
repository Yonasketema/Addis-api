const User = require("../models/userModel");

exports.me = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
};
