const db = require("../../models");
const User = db.users;
const passwordUtil = require("../../utils/password.util");
const tokenUtils = require("../../utils/token.util");

const signup = async (req, res) => {
  await User.create({
    nama: req.body.nama,
    email: req.body.email,
    password: await passwordUtil.encrypt(req.body.password),
  });

  return res.status(201).json({
    success: true,
    message: "user registered successfully",
  });
};

const login = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const checkUser = await passwordUtil.compare(
    req.body.password,
    user.password
  );
  if (!checkUser) {
    return res.status(401).json({ message: "Password Incorrect" });
  }

  const token = await tokenUtils.encode(user);
  return res.json({ token: token });
};

module.exports = { signup, login };
