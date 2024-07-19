import mongoose from "mongoose";

import { Schema } from "mongoose";

const ratingSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    ratedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
