import bcrypt from "bcryptjs";

import User from "../models/user.model.mjs";
import createJwtTokneAndSetCookie from "../utils/createJwtToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password don't match" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "User allready exists" });
    }

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // hash password
    const salt = await bcrypt.genSalt(10); // 10 is standard value
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // create jwt token and set cookie
      createJwtTokneAndSetCookie(newUser._id, res);

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invaalid user data" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser?.password || ""
    );

    if (!existingUser || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    createJwtTokneAndSetCookie(existingUser._id, res);

    return res.status(201).json({
      _id: existingUser._id,
      fullName: existingUser.fullName,
      username: existingUser.username,
      profilePic: existingUser.profilePic,
    });
  } catch (error) {}
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(201).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
