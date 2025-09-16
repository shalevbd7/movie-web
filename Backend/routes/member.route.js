import express from "express";
import * as memberController from "../controllers/member.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();
router.use(protectRoute);
router.get("/", memberController.getAllMembers);
router.get("/searchcity", memberController.findMemberByCity);
router.post("/addmember", memberController.createMember);
router.get("/:id", memberController.getMemberById);
router.patch("/:id", memberController.updateMember);
router.delete("/:id", memberController.deleteMember);

export default router;
