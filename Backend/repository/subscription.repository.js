// This file contains a service layer for handling Subscriptions-related database operations.
import { Subscription } from "../models/subscription.model.js";

export const getAllSubscriptions = async () => {
  return await Subscription.find({})
    .populate("memberId")
    .populate("movieId")
    .sort({ watchedDate: -1 });
};

export const getSubscriptionsByMemberId = async (memberId) => {
  return await Subscription.find({ memberId })
    .populate("movieId")
    .populate("memberId")
    .sort({ watchedDate: -1 });
};

export const getSubscriptionsByMovieId = async (movieId) => {
  return await Subscription.find({ movieId })
    .populate("memberId")
    .populate("movieId")
    .sort({ watchedDate: -1 });
};

export const getSubscriptionByMemberAndMovie = async (memberId, movieId) => {
  return await Subscription.findOne({ memberId, movieId })
    .populate("memberId")
    .populate("movieId");
};

export const createSubscription = async (subscriptionData) => {
  const newSubscription = new Subscription(subscriptionData);
  const savedSubscription = await newSubscription.save();

  return await Subscription.findById(savedSubscription._id)
    .populate("memberId")
    .populate("movieId");
};

export const updateSubscriptionByMemberAndMovie = async (
  memberId,
  movieId,
  updateData
) => {
  return await Subscription.findOneAndUpdate(
    { memberId, movieId },
    updateData,
    { new: true }
  )
    .populate("memberId")
    .populate("movieId");
};

export const deleteSubscriptionByMemberAndMovie = async (memberId, movieId) => {
  return await Subscription.findOneAndDelete({ memberId, movieId });
};

export const deleteAllSubscriptionsByMemberId = async (memberId) => {
  return await Subscription.deleteMany({ memberId });
};

export const deleteAllSubscriptionsByMovieId = async (movieId) => {
  return await Subscription.deleteMany({ movieId });
};

export const countSubscriptionsByMemberId = async (memberId) => {
  return await Subscription.countDocuments({ memberId });
};

export const countSubscriptionsByMovieId = async (movieId) => {
  return await Subscription.countDocuments({ movieId });
};

export const isValidObjectId = (id) => {
  return id.match(/^[0-9a-fA-F]{24}$/);
};
