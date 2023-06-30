import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import User from "../models/User.js";
import Role from "../models/Role.js";
import axios from "axios";

export const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ status: "Forbidden", code: 403, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ status: "Not Found", code: 404, message: "User not found" });

    next();
  } catch (error) {
    return res.status(401).json({ status: "Unauthorized", code: 401, message: "Invalid token" });
  }
};

export const setUserName = async (req, res, next) => {
  try {
    const user = await axios.get("https://randomuser.me/api/");
    const username = user.data.results[0].login.username;
    req.body.username = username;

    next();
  } catch (error) {
    console.error("Error while setting random username:", error);
    return res.status(500).json({ status: "Server Error", code: 500, message: "Server Error" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ status: "Forbidden", code: 403, message: "This operation requires admin role" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Server Error", code: 500, message: error });
  }
};
