import express from "express";
import * as subscriptionController from "../controllers/subscription.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();
router.use(protectRoute);
// Get routes:
router.get("/", subscriptionController.getAllSubscriptions);
router.get("/subscription", subscriptionController.getSubscription);
router.get(
  "/members/:memberId/movies",
  subscriptionController.getMoviesByMember
);
router.get("/movies/:movieId", subscriptionController.getMembersByMovie);
router.get(
  "/members/:memberId/subscriptions",
  subscriptionController.getSubscriptionsByMember
);
router.get(
  "/movies/:movieId/subscriptions",
  subscriptionController.getSubscriptionsByMovie
);
router.get("/members/:memberId/stats", subscriptionController.getMemberStats);
router.get("/movies/:movieId/stats", subscriptionController.getMovieStats);

// POST Routes
router.post("/addsubscription", subscriptionController.addSubscription);

// PATCH Routes
router.patch("/updatedate", subscriptionController.updatewatchedDate);

// DELETE Routes
router.delete("/removesubscription", subscriptionController.removeSubscription);

export default router;
