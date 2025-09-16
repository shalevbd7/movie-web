import express from "express";
import * as movieControler from "../controllers/movie.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();
router.use(protectRoute);
router.get("/", movieControler.getAllMovies);
router.get("/search", movieControler.searchMovieByName);
router.get("/searchgenre", movieControler.searchMovieByGenres);
router.get("/:id", movieControler.getMovieById);
router.post("/addmovie", movieControler.createMovie);
router.patch("/:id", movieControler.updateMovie);
router.delete("/:id", movieControler.deleteMovie);

export default router;
