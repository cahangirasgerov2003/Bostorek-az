import Book from "../models/Book.js";
const getAllBooks = (req, res) => {
  console.log("All books will be retrived");
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
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export { getAllBooks, createNewBook };
