import { Schema, model } from "mongoose";

const schema = new Schema({
  items: {
    type: [Schema.Types.ObjectId],
    ref: "Item",
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  datetime: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

export default model("Purchase", schema);
