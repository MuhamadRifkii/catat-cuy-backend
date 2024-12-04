const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Token not provided" });
  }

  jwt.verify(token, process.env.TOKEN_SHHHH, (error, decode) => {
    if (error) {
      return res
        .status(401)
        .json({ message: "Authentication failed: Invalid Token" });
    }

    next();
  });
};

module.exports = auth;
