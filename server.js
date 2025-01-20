require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const mongoose = require("mongoose");

// express app
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);

app.use("/api/user", userRoutes);

// connect mongo db

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for rquests
    app.listen(process.env.PORT || 4000, () =>
      console.log("listening on port 4000 !!!!")
    );
  })
  .catch((error) => {
    console.log(error);
  });
