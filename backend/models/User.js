import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: String,
  middle_name: String,
  last_name: String,
  email: String,
  created_at: Date,
  updated_at: Date
});

export default mongoose.model("User", userSchema);
