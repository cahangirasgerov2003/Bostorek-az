import User from "../models/User.js";
import {
  controlObjectId,
  findDocumentById,
  checkValidationErrors,
} from "../utility/index.js";
const updateUserDetails = async (req, res) => {
  const { userName, email, password, gender, bookGenres } = req.body;

  const id = req.user._id;

  if (controlObjectId(id, res)) return;

  try {
    const aUser = await findDocumentById(User, id, res);

    if (!aUser) return;

    aUser.userName = userName || aUser.userName;
    aUser.email = email || aUser.email;
    aUser.password = password || aUser.password;
    aUser.gender = gender || aUser.gender;
    aUser.bookGenres = bookGenres || aUser.bookGenres;

    await aUser.save();

    return res
      .status(200)
      .json({ message: "The user details updated successfully !" });
  } catch (error) {
    checkValidationErrors(error, "updateUserDetails", res);
  }
};

export { updateUserDetails };
