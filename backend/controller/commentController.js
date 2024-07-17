import Comment from "../models/Comment.js";
import { checkValidationErrors } from "../utility/index.js";
const createNewComment = async (req, res) => {
  const { content, commentedBy, reviewedBook } = req.body;

  try {
    if (!content || !commentedBy || !reviewedBook) {
      return res.status(400).json({ error: "All fields are required !" });
    }

    let comment = await Comment.create({
      content,
      commentedBy,
      reviewedBook,
    });

    comment = await comment.populate({
      path: "commentedBy",
      select: "-password",
    });

    return res
      .status(200)
      .json({ message: "The comment created successfully !", comment });
  } catch (error) {
    checkValidationErrors(error, "createNewComment", res);
  }
};

const getCommentsForBook = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ reviewedBook: id }).populate({
      path: "commentedBy",
      select: "-password",
    });

    return res.status(200).json({
      message: "The comments for book was found successfully !",
      comments,
    });
  } catch (error) {
    console.error("Error at getCommentsForBook", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createNewComment, getCommentsForBook };
