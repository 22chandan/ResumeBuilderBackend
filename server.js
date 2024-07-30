const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

const port = 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
  mongoose
    .connect("mongodb://localhost:27017/resumeDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
});
