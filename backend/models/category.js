const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  title: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }
});

module.exports = mongoose.model("Category", CategorySchema);
