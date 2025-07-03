import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // Support both 'token' and 'authorization' headers
  let token = req.headers.token;
  if (!token && req.headers.authorization) {
    // Support 'Bearer <token>'
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, login again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
