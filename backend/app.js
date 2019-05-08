const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const adminPosts = require("./routes/adminposts");

const app = express();

mongoose.connect("mongodb+srv://Usell:uTixBkqxpicAC48N@cluster0-swdpb.mongodb.net/usell-project?retryWrites=true")
.then(() => {
  console.log("Connected to database!");
}).catch(() => {
  console.log("connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin/categories", adminRoutes);
app.use("/api/admin/posts", adminPosts);

module.exports = app;
