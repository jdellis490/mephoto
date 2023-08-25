const jwt = require("jsonwebtoken");

// Create token secret and expiration date
const secret = "ironMaiden";
const expiration = "2h";

module.exports = {
  // Function for auth routes
  authMiddleware: function ({ req }) {
    // sends token via req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    if (!token) {
      return req;
    }
    // Verifies token and gets user data
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
