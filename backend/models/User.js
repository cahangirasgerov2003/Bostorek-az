import mongoose, { model } from "mongoose";

import { Schema } from "mongoose";

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 12,
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
      maxLength: 10,
      minLength: 4,
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

const User = mongoose.model("User", userSchema);

export default User;
