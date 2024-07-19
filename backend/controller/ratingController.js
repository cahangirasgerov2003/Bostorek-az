import Rating from "../models/Rating.js";
import { checkValidationErrors } from "../utility/index.js";
const createNewRating = async (req, res) => {
  const { rating, ratedBy, book } = req.body;

  try {
    if (!rating || !ratedBy || !book) {
      return res.status(400).json({ error: "All fields are required !" });
    }

    let newRating = await Rating.create({
      rating,
      ratedBy,
      book,
    });

    newRating = await newRating.populate({
      path: "ratedBy",
      select: "-password",
    });

    newRating = await newRating.populate("book");

    return res.status(200).json({
      message: "The rating created successfully !",
      rating: newRating,
    });
  } catch (error) {
    checkValidationErrors(error, "createNewRating", res);
  }
};

const getRatingsForBook = async (req, res) => {
  try {
    const { id } = req.params;

    const ratings = await Rating.find({ book: id }).populate({
      path: "ratedBy",
      select: "-password",
    });

    return res.status(200).json({
      message: "The ratings for book was found successfully !",
      ratings,
    });
  } catch (error) {
    console.error("Error at getRatingsForBook", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createNewRating, getRatingsForBook };
