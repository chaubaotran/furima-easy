import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

import { User } from "../interface/User";
import { ErrorMessages } from "../shared/enum";

const schema = new Schema<User>({
  name: {
    type: String,
    required: [true, ErrorMessages.MISSING_NAME],
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, ErrorMessages.MISSING_EMAIL],
    validate: [validator.isEmail, ErrorMessages.INVALID_EMAIL],
    unique: true,
  },
  password: {
    type: String,
    required: [true, ErrorMessages.MISSING_PASSWORD],
    validate: [validator.isStrongPassword, ErrorMessages.WEAK_PASSWORD],
  },
});

schema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default model("User", schema);
