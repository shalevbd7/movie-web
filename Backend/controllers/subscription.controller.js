// This file contains controller functions for handling subscription-related API requests.
// Each function interacts with the subscriptionService to manage the relationship between members and movies.
import * as subscriptionService from "../service/subscription.servic.js";

// Controller to get a list of movies a specific member has subscribed to.
export async function getMoviesByMember(req, res) {
  try {
    const { memberId } = req.params;
    const result = await subscriptionService.getMoviesByMember(memberId);

    if (!result.success && result.statusCode) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getMoviesByMember controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
// Controller to get a list of members who have subscribed to a specific movie.
export async function getMembersByMovie(req, res) {
  try {
    const { movieId } = req.params;
    const result = await subscriptionService.getMembersByMovie(movieId);

    if (!result.success && result.statusCode) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getMembersByMovie controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
// Controller to add a new subscription record.
export async function addSubscription(req, res) {
  try {
    const { memberId, movieId, watchedDate } = req.body;

    const result = await subscriptionService.addSubscription(
      memberId,
      movieId,
      watchedDate
    );

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(result.statusCode).json(result);
  } catch (error) {
    console.log("Error in addSubscription controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// Controller to update the 'watchedDate' of an existing subscription.
export async function updatewatchedDate(req, res) {
  try {
    const { memberId, movieId, watchedDate } = req.body;

    const result = await subscriptionService.updatewatchedDate(
      memberId,
      movieId,
      watchedDate
    );
    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in updateWatchedDate controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
// Controller to remove a subscription record
export async function removeSubscription(req, res) {
  try {
    const { memberId, movieId } = req.body;
    const result = await subscriptionService.removeSubscription(
      memberId,
      movieId
    );

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in removeSubscription controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
// Controller to get a member's subscriptions.
export async function getSubscriptionsByMember(req, res) {
  try {
    const { memberId } = req.params;
    const result = await subscriptionService.getSubscriptionsByMember(memberId);

    if (!result.success && result.statusCode) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getSubscriptionsByMember controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
// Controller to get a movie's subscriptions.
export async function getSubscriptionsByMovie(req, res) {
  try {
    const { movieId } = req.params;
    const result = await subscriptionService.getSubscriptionsByMovie(movieId);
    if (!result.success && result.statusCode) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getSubscriptionsByMovie controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
// Controller to get a specific subscription record.
export async function getSubscription(req, res) {
  try {
    const { memberId, movieId } = req.query;
    const result = await subscriptionService.getSubscription(memberId, movieId);
    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getSubscription controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
// Controller to get all subscription records.
export async function getAllSubscriptions(req, res) {
  try {
    const result = await subscriptionService.getAllSubscriptions();
    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getAllSubscriptions controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// Controller to get the number of movies a member has watched.
export async function getMemberStats(req, res) {
  try {
    const { memberId } = req.params;
    const result = await subscriptionService.getMemberMovieCount(memberId);

    if (!result.success && result.statusCode) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getMemberStats controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// Controller to get the number of members who watched a specific movie.
export async function getMovieStats(req, res) {
  try {
    const { movieId } = req.params;
    const result = await subscriptionService.getMovieMemberCount(movieId);

    if (!result.success && result.statusCode) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getMovieStats controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
