import Comment from "../models/Comment.js";
import { checkValidationErrors } from "../utility/index.js";
const createNewComment = async (req, res) => {
  const { content, commentedBy, reviewedBook } = req.body;

  try {
    const comment = await Comment.create({
      content,
      commentedBy,
      reviewedBook,
    });

    return res
      .status(200)
      .json({ message: "The comment created successfully !", comment });
  } catch (error) {
    checkValidationErrors(error, "createNewComment", res);
  }
};

export { createNewComment };
