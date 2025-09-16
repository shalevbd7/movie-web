import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  watchedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
