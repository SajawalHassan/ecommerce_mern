const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

require("dotenv").config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Routes middleware
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

// Connecting to DB
mongoose.connect(process.env.DB_ACCESS_KEY, () =>
  console.log("Connected to db!")
);

// Starting server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
