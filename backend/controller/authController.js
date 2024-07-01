import User from "../models/User.js";
import { checkValidationErrors } from "../utility/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const createNewUser = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message:
          "Alternatively, you can try creating a new user with a different email",
        error: "The user already exists !",
      });
    }

    const newUser = await User.create(req.body);

    newUser.password = undefined;

    return res.status(201).json({
      message: "The new user has been successfully created !",
      user: newUser,
    });
  } catch (error) {
    checkValidationErrors(error, "createNewUser", res);
  }
};

const loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await User.findOne({ email });

    if (!result) return res.status(404).json({ error: "User not found !" });

    const pass = await bcrypt.compare(password, result.password);

    if (!pass)
      return res
        .status(401)
        .json({ error: "The password you entered is not correct !" });

    result.password = undefined;

    // Kullanici giris yapmismi kontrol edek
    const token = jwt.sign(
      {
        userId: result._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: process.env.EXPIRES_IN }
    );

    return res
      .status(200)
      .json({ message: "Successfully logged in !", user: result, token });
  } catch (error) {
    console.error("Error at loginAccount", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createNewUser, loginAccount };
