import mongoose from "mongoose";

const controlObjectId = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "The id value in the query is not a valid objectId value",
    });
  }
};

const findDocumentById = async (collection, id, res) => {
  try {
    const document = await collection.findById(id);

    if (!document) {
      res
        .status(404)
        .json({
          error: `No ${collection.modelName} with this ID value was found`,
        });

      return null;
    }

    return document;
  } catch (error) {
    console.error(
      `An error occurred while requesting the ${collection.modelName} collection.`,
      error
    );
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { controlObjectId, findDocumentById };
