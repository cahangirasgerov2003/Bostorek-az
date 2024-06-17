import User from "../models/User.js";
import { checkValidationErrors } from "../utility/index.js";
const createNewUser = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message:
          "Alternatively, you can try creating a new user with a different email",
        error: "The user already exists",
      });
    }

    const newUser = await User.create(req.body);

    newUser.password = undefined;

    return res.status(201).json({
      message: "The new user has been successfully created",
      user: newUser,
    });
  } catch (error) {
    checkValidationErrors(error, "createNewUser", res);
  }
};

export { createNewUser };
