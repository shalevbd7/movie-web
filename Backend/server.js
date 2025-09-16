import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import { ENV_VARS } from "./config/envVars.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import movieRoute from "./routes/movie.route.js";
import memberRoute from "./routes/member.route.js";
import subscriptionRoute from "./routes/subscription.route.js";
const app = express();
const PORT = ENV_VARS.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movies", movieRoute);
app.use("/api/v1/members", memberRoute);
app.use("/api/v1/subs", subscriptionRoute);
app.listen(PORT, () => {
  console.log("server is running at http://localhost:" + PORT);
  connectDB();
});
