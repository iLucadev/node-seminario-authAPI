import Role from "../models/Role.js";
import User from "../models/User.js";
import { ADMIN_NAME, ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } from "../config.js";

export const createRoles = async () => {
  try {
    // Count documents
    const count = await Role.estimatedDocumentCount();
    console.log(count);

    // Check for existing roles
    if (count > 0) return;

    // Create default roles
    const values = await Promise.all([new Role({ name: "user" }).save(), new Role({ name: "admin" }).save()]);
    console.log(values);
  } catch (error) {
    console.log(error);
  }
};

export const createAdmin = async () => {
  // Check for an existing admin user
  const admin = await User.findOne({ email: ADMIN_EMAIL });

  if (admin) return;

  // Get role _id
  const adminRole = await Role.findOne({ name: "admin" });
  if (!adminRole) {
    console.log("No admin role found");
    return;
  }

  // Create a new admin user
  const newUser = new User({
    name: ADMIN_NAME,
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    roles: [adminRole._id],
  });

  await newUser.save();
};

export const setupApp = async () => {
  try {
    await createRoles();
    await createAdmin();
    console.log("Setup completed succesfully");
  } catch (error) {
    console.log(error);
  }
};

setupApp();
