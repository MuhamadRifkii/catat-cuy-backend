const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const encode = async (user) => {
  const token = jwt.sign(
    {
      user_id: user.id,
      email: user.email,
    },
    process.env.TOKEN_SHHHH,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

module.exports = { encode };
