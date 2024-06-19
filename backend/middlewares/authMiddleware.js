import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authorizationUser = async (req, res, next) => {
  const authorizationToken = req.headers.authorization;

  if (!authorizationToken)
    return res.status(401).json({ error: "Authorization token is missing !" });

  const tokenArray = authorizationToken.split(" ");

  if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer")
    return res
      .status(401)
      .json({ error: "Token generation is not correct or not supported" });

  const jwtToken = tokenArray[1];

  const decodedToken = jwt.verify(jwtToken, process.env.SECRET_KEY);

  try {
    const user = await User.findById(decodedToken.userId);

    req.user = user;

    next();
  } catch (error) {
    console.error(
      "The token is invalid or expired, perhaps the user was not found !",
      error
    );
  }
};

export default { authorizationUser };
