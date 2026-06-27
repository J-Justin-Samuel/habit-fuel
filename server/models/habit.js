import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    history: [{ type: String }], // Store completed dates in 'YYYY-MM-DD' format
  },
  { timestamps: true },
);

export default mongoose.model("Habit", habitSchema);
