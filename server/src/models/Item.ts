import { Schema, model } from "mongoose";

import { ErrorMessages } from "../shared/enum";

const schema = new Schema({
  price: {
    type: Number,
    required: [true, ErrorMessages.MISSING_PRICE],
  },
  quantity: {
    type: Number,
    required: [true, ErrorMessages.MISSING_QUANTITY],
  },
  note: {
    type: String,
  },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
});

export default model("Item", schema);
