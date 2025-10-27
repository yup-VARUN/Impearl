import mongoose from "mongoose";

const marketplaceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Marketplace", marketplaceSchema);
