import Book from "../models/Book.js";
import { controlObjectId, findDocumentById } from "../utility/index.js";
const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    return res
      .status(200)
      .json({ message: "All books returned successfully", books: allBooks });
  } catch (error) {
    console.error("Error at getAllBooks", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getABook = async (req, res) => {
  try {
    const { id } = req.params;

    if (controlObjectId(id, res)) return;

    const aBook = await findDocumentById(Book, id, res);

    if (!aBook) return;

    return res
      .status(200)
      .json({ message: "The searched book was found successfully", aBook });
  } catch (error) {
    console.error("Error at getABook", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createNewBook = async (req, res) => {
  try {
    const { title, author } = req.body;

    const existingBook = await Book.findOne({ title, author });

    if (existingBook) {
      return res.status(409).json({
        message:
          "Alternatively, you can try creating a new book with a different author or book title",
        error: "The book already exists",
      });
    } else {
      const newBook = await Book.create(req.body);

      return res.status(201).json({
        message: "The new book has been successfully created",
        book: newBook,
      });
    }
  } catch (error) {
    if (error.name === "Validation error") {
      const validationErrors = {};
      for (let key in error.errors) {
        validationErrors[key] = error.errors[key].message;
      }

      return res
        .status(400)
        .json({ error: "Validation error", validationErrors });
    } else {
      console.error("Error at creatNewBook", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const updateABook = async (req, res) => {
  const { id } = req.params;
  const { title, author, page, description, rating } = req.body;

  if (controlObjectId(id, res)) return;

  try {
    const aBook = await findDocumentById(Book, id, res);

    if (!aBook) return;

    aBook.title = title || aBook.title;
    aBook.author = author || aBook.author;
    aBook.page = page || aBook.page;
    aBook.description = description || aBook.description;
    aBook.rating = rating || aBook.rating;

    await aBook.save();

    return res.status(200).json({ message: "The book updated successfully" });
  } catch (error) {
    console.error("Error at updateABook", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteABook = async (req, res) => {
  const { id } = req.params;

  if (controlObjectId(id, res)) return;

  try {
    const aBook = await Book.findByIdAndDelete(id);

    if (!aBook) {
      return res
        .status(404)
        .json({ error: "No book with this ID value was found" });
    }

    return res.status(200).json({ message: "The book deleted successfully" });
  } catch (error) {
    console.error("Error at deleteABook", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllBooks, createNewBook, getABook, updateABook, deleteABook };
