import { Schema, model } from "mongoose";

import { ErrorMessages } from "../shared/enum";

const schema = new Schema({
  name: {
    type: String,
    required: [true, ErrorMessages.MISSING_NAME],
    unique: true,
    minlength: 3,
  },
  description: {
    type: String,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model("Product", schema);
