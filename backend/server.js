import express from "express";
import book from "./routes/book.js";
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import connectDb from "./config/db.js";
import cors from "cors";

const app = express();

const port = 3000;

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/books", book);

app.use("/api/v1/auth", auth);

app.use("/api/v1/user", user);

try {
  await connectDb();

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
} catch (error) {
  process.exit(1);
}
