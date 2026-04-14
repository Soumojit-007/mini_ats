import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    name: String,
    experience: Number,
    skills: [String],
    matchingJobs: Array,
    topMatch: Object
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);