const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const encode = async (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.TOKEN_SHHHH,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

module.exports = { encode };
