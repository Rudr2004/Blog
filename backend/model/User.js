import mongoose from "mongoose";
import { userValidation } from "./Validations.js";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
});

const User = mongoose.model("User", userSchema);
const Validation = (user) => {
  return userValidation.validate(user);
};

export { User, Validation };
