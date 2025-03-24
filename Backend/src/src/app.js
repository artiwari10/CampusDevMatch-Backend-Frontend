
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();

app.use(cors({
  origin: "https://campus-dev-match-backend-frontend.vercel.app",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.SERVERPORT, () => {
      console.log("Server is successfully listening on port 8888");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
