const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const signToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRE_IN,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    if (!name || !email || !password || !passwordConfirm) {
      throw new Error(
        "please provide name, email, password, passwordConfirm !"
      );
    }

    if (await User.findOne({ email })) {
      throw new Error(
        "please your email address is already register try with different email address!"
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    const token = signToken(user.id, res);

    user.password = undefined;

    res.status(201).json({
      session: {
        token,
      },
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("please provide email and password!");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.isPasswordCorrect(password, user.password))) {
      throw new Error("Incorrect email or password");
    }

    const token = signToken(user.id, res);

    user.password = undefined;

    res.status(201).json({
      session: {
        token,
      },
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new Error("Authentication credentials were not provided."));
  }

  let decoded;

  jwt.verify(token, process.env.SECRET_KEY, (err, dec) => {
    decoded = { ...dec };
    if (err) {
      return next(err);
    }
  });

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new Error("The user does not exist"));
  }

  if (user.isPasswordchanged(decoded.iat)) {
    return next(new Error("User changed password! please login again"));
  }

  req.user = user;

  next();
};

exports.permissionTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error("You are not allowed to access this"));
    }
    next();
  };
};
