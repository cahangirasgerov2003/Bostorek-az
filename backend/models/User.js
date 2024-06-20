import mongoose from "mongoose";

import { Schema } from "mongoose";

import bcrypt from "bcryptjs";

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 9,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [emailRegex, "Invalid email adress"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 10,
    },
    gender: {
      type: String,
      required: true,
    },
    bookGenres: {
      type: Array,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
  } catch (error) {
    console.error("Error occurred during password hashing : ", error);
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
