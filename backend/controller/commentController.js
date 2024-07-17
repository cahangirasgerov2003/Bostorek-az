import Comment from "../models/Comment.js";
import { checkValidationErrors } from "../utility/index.js";
const createNewComment = async (req, res) => {
  const { content, commentedBy, reviewedBook } = req.body;

  try {
    if (!content || !commentedBy || !reviewedBook) {
      return res.status(400).json({ error: "All fields are required !" });
    }

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
