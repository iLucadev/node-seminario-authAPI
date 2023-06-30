import User from "../models/User.js";
import Role from "../models/Role.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export const signUp = async (req, res) => {
  try {
    const { user, username, email, password, roles } = req.body;

    const newUser = new User({
      user,
      username,
      email,
      password: await User.encryptPassword(password),
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 3600, // 1 hour
    });

    res.status(200).json({ status: "OK", code: 200, token: token });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Internal Server Error", code: 500, message: "Error occurred when saving the user" });
  }
};
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email: email }).populate("roles");

    if (!userFound) res.status(400).json({ status: "Not Found", code: 400, message: "User not found" });

    const passwordMatch = await User.validateEncryptedPassword(password, userFound.password);

    if (!passwordMatch) return res.status(401).json({ status: "Unauthorized", code: 401, message: "Invalid password" });

    const token = jwt.sign({ id: userFound._id }, SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({ status: "OK", code: 200, token: token });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Internal Server Error", code: 500, message: "Error occurred when signing the user" });
  }
};
