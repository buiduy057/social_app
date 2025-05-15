import express from "express";
import { db } from "./config/connect.js";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();


//middlewares

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser())


app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comment", commentRoutes);

db.connect((err) => {
  if (!err) {
    console.log("✅ Kết nối thành công với MySQL.");
  }
});
app.listen(8800, () => {
  console.log("Api Working");
});
