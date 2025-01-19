import mongoose from "mongoose";

export const validationID = async (id) => {
  const invalidID = await mongoose.Types.ObjectId.isValid(id);
  if (!invalidID) throw new Error("Invalid ID");
};
