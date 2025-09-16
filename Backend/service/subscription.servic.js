// This file contains the service layer logic for managing subscriptions data.
import * as subscriptionRepository from "../repository/subscription.repository.js";

export const getMoviesByMember = async (memberId) => {
  if (!subscriptionRepository.isValidObjectId(memberId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid member ID format",
    };
  }
  const subscriptions = await subscriptionRepository.getSubscriptionsByMemberId(
    memberId
  );

  if (!subscriptions || subscriptions.length === 0) {
    return {
      success: true,
      count: 0,
      movies: [],
      message: "No movies found for this member",
    };
  }
  const movies = subscriptions.filter((sub) => sub.movieId);
  return {
    success: true,
    count: movies.length,
    movies: movies,
    message: `${movies.length} movies found successfully`,
  };
};

export const getMembersByMovie = async (movieId) => {
  if (!subscriptionRepository.isValidObjectId(movieId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid member ID format",
    };
  }

  const subscriptions = await subscriptionRepository.getSubscriptionsByMovieId(
    movieId
  );

  if (!subscriptions || subscriptions === 0) {
    return {
      success: true,
      count: 0,
      members: [],
      message: "No members found for this movie",
    };
  }

  const members = subscriptions.filter((sub) => sub.memberId);

  return {
    success: true,
    count: members.length,
    members: members,
    message: `${members.length} members found successfully`,
  };
};

export const addSubscription = async (
  memberId,
  movieId,
  watchedDate = null
) => {
  if (!memberId || !movieId) {
    return {
      success: false,
      statusCode: 400,
      message: "Member ID and Movie ID are required",
    };
  }
  if (!subscriptionRepository.isValidObjectId(memberId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid member ID format",
    };
  }

  if (!subscriptionRepository.isValidObjectId(movieId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid movie ID format",
    };
  }

  const existingSubscription =
    await subscriptionRepository.getSubscriptionByMemberAndMovie(
      memberId,
      movieId
    );

  if (existingSubscription) {
    return {
      success: false,
      statusCode: 400,
      message: "Member already watched this movie",
    };
  }

  const subscriptionData = {
    memberId,
    movieId,
    watchedDate: watchedDate || new Date(),
  };

  const newSubscription = await subscriptionRepository.createSubscription(
    subscriptionData
  );

  return {
    success: true,
    statusCode: 201,
    subscription: newSubscription,
    message: "Subscription created successfully",
  };
};

export const updatewatchedDate = async (memberId, movieId, newWatchedDate) => {
  if (!memberId || !movieId || !newWatchedDate) {
    return {
      success: false,
      statusCode: 400,
      message: "All fields are required",
    };
  }
  if (!subscriptionRepository.isValidObjectId(memberId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid member ID format",
    };
  }

  if (!subscriptionRepository.isValidObjectId(movieId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid movie ID format",
    };
  }

  const updatedSubscription =
    await subscriptionRepository.updateSubscriptionByMemberAndMovie(
      memberId,
      movieId,
      { watchedDate: new Date(newWatchedDate) }
    );

  if (!updatedSubscription) {
    return {
      success: false,
      statusCode: 404,
      message: "Subscription not found",
    };
  }

  return {
    success: true,
    subscription: updatedSubscription,
    message: "Watched date updated successfully",
  };
};

export const removeSubscription = async (memberId, movieId) => {
  if (!memberId || !movieId) {
    return {
      success: false,
      statusCode: 400,
      message: "Member ID and Movie ID are required",
    };
  }

  if (!subscriptionRepository.isValidObjectId(memberId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid member ID format",
    };
  }

  if (!subscriptionRepository.isValidObjectId(movieId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid movie ID format",
    };
  }

  const deletedSubscription =
    await subscriptionRepository.deleteSubscriptionByMemberAndMovie(
      memberId,
      movieId
    );

  if (!deletedSubscription) {
    return {
      success: false,
      statusCode: 404,
      message: "Subscription not found",
    };
  }

  return {
    success: true,
    subscription: deletedSubscription,
    message: "Subscription deleted successfully",
  };
};

export const getSubscriptionsByMember = async (memberId) => {
  if (!subscriptionRepository.isValidObjectId(memberId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid member ID format",
    };
  }

  const subscriptions = await subscriptionRepository.getSubscriptionsByMemberId(
    memberId
  );

  return {
    success: true,
    count: subscriptions.length,
    subscriptions: subscriptions,
    message:
      subscriptions.length > 0
        ? `${subscriptions.length} subscriptions found successfully`
        : "No subscriptions found for this member",
  };
};

export const getSubscriptionsByMovie = async (movieId) => {
  if (!subscriptionRepository.isValidObjectId(movieId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid movie ID format",
    };
  }

  const subscriptions = await subscriptionRepository.getSubscriptionsByMovieId(
    movieId
  );

  return {
    success: true,
    count: subscriptions.length,
    subscriptions: subscriptions,
    message:
      subscriptions.length > 0
        ? `${subscriptions.length} subscriptions found successfully`
        : "No subscriptions found for this movie",
  };
};

export const getSubscription = async (memberId, movieId) => {
  if (!memberId || !movieId) {
    return {
      success: false,
      statusCode: 400,
      message: "Member ID and Movie ID are required",
    };
  }

  if (!subscriptionRepository.isValidObjectId(memberId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid member ID format",
    };
  }

  if (!subscriptionRepository.isValidObjectId(movieId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid movie ID format",
    };
  }

  const subscription =
    await subscriptionRepository.getSubscriptionByMemberAndMovie(
      memberId,
      movieId
    );

  if (!subscription) {
    return {
      success: false,
      statusCode: 404,
      message: "Subscription not found",
    };
  }

  return {
    success: true,
    subscription: subscription,
    message: "Subscription found successfully",
  };
};

export const getAllSubscriptions = async () => {
  const subscriptions = await subscriptionRepository.getAllSubscriptions();

  return {
    success: true,
    count: subscriptions.length,
    subscriptions: subscriptions,
    message: "Subscriptions retrieved successfully",
  };
};

export const getMemberMovieCount = async (memberId) => {
  if (!subscriptionRepository.isValidObjectId(memberId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid member ID format",
    };
  }

  const movieCount = await subscriptionRepository.countSubscriptionsByMemberId(
    memberId
  );

  return {
    success: true,
    data: {
      memberId,
      totalMoviesWatched: movieCount,
    },
    message: "Member statistics retrieved successfully",
  };
};

export const getMovieMemberCount = async (movieId) => {
  if (!subscriptionRepository.isValidObjectId(movieId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid movie ID format",
    };
  }

  const memberCount = await subscriptionRepository.countSubscriptionsByMovieId(
    movieId
  );

  return {
    success: true,
    data: {
      movieId,
      totalMembersWatched: memberCount,
    },
    message: "Movie statistics retrieved successfully",
  };
};
