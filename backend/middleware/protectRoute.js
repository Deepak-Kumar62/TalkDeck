import jsonwebtoken, { decode } from "jsonwebtoken";
import User from "../models/user.model.mjs";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password"); // Remove password from user

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect route middleware: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
