const jwt = require("jsonwebtoken");

function allowedRoles(...roles) {
  return async function (req, res, next) {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        _id: decoded.id,
        role: decoded.role,
      };

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access Denied" });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}

module.exports = { allowedRoles };
