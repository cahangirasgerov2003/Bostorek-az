import Comment from "../models/Comment.js";
import {
  checkValidationErrors,
  controlObjectId,
  findDocumentById,
} from "../utility/index.js";
const getAllComments = async (req, res) => {
  try {
    const allComments = await Comment.find({}).populate({
      path: "commentedBy",
      select: "userName",
    });
    return res.status(200).json({
      message: "All comments returned successfully",
      comments: allComments,
    });
  } catch (error) {
    console.error("Error at getAllComments", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
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

    comment = await comment.populate("reviewedBook");

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

const getCommentsByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ commentedBy: id }).populate(
      "reviewedBook"
    );

    return res.status(200).json({
      message: "The comments by user was found successfully !",
      comments,
    });
  } catch (error) {
    console.error("Error at getCommentsByUser", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAComment = async (req, res) => {
  const { id } = req.params;

  if (controlObjectId(id, res)) return;

  try {
    const aComment = await Comment.findByIdAndDelete(id);

    if (!aComment) {
      return res
        .status(404)
        .json({ error: "No comment with this ID value was found !" });
    }

    return res
      .status(200)
      .json({ message: "The comment deleted successfully !" });
  } catch (error) {
    console.error("Error at deleteAComment", error);
    return res.status(500).json({ error: "Internal Server Error !" });
  }
};

const updateAComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (controlObjectId(id, res)) return;

  try {
    const aComment = await findDocumentById(Comment, id, res);

    if (!aComment) return;

    aComment.content = content || aComment.content;

    await aComment.save();

    return res.status(200).json({
      message: "The comment updated successfully !",
      comment: aComment,
    });
  } catch (error) {
    console.error("Error at updateAComment !", error);
    return res.status(500).json({ error: "Internal Server Error !" });
  }
};

export {
  createNewComment,
  getCommentsForBook,
  getCommentsByUser,
  deleteAComment,
  updateAComment,
  getAllComments,
};
