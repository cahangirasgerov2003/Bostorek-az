import Rating from "../models/Rating.js";
import {
  checkValidationErrors,
  controlObjectId,
  findDocumentById,
} from "../utility/index.js";
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

const getRatingsByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const ratings = await Rating.find({ ratedBy: id }).populate("book");

    return res.status(200).json({
      message: "The ratings by user was found successfully !",
      ratings,
    });
  } catch (error) {
    console.error("Error at getRatingsByUser", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateARating = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  if (controlObjectId(id, res)) return;

  try {
    const aRating = await findDocumentById(Rating, id, res);

    if (!aRating) return;

    aRating.rating = rating || aRating.rating;

    await aRating.save();

    return res.status(200).json({
      message: "The rating updated successfully !",
      rating: aRating,
    });
  } catch (error) {
    console.error("Error at updateARating !", error);
    return res.status(500).json({ error: "Internal Server Error !" });
  }
};

const deleteARating = async (req, res) => {
  const { id } = req.params;

  if (controlObjectId(id, res)) return;

  try {
    const aRating = await Rating.findByIdAndDelete(id);

    if (!aRating) {
      return res
        .status(404)
        .json({ error: "No rating with this ID value was found !" });
    }

    return res
      .status(200)
      .json({ message: "The rating deleted successfully !" });
  } catch (error) {
    console.error("Error at deleteARating", error);
    return res.status(500).json({ error: "Internal Server Error !" });
  }
};

export {
  createNewRating,
  getRatingsForBook,
  getRatingsByUser,
  updateARating,
  deleteARating,
};
