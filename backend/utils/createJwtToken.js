import jsonwebtoken from "jsonwebtoken";

const createJwtTokneAndSetCookie = (userId, res) => {
  const token = jsonwebtoken.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // in mili second
    httpOnly: true, // prevent XSS attack cross-site scripting attack
    sameSite: "Strict", // CSRF attacks cross-site request forgery attack
    secure : process.env.NODE_ENV !== "development"
  });
};

export default createJwtTokneAndSetCookie;
