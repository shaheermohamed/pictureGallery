const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  images: [{ url: { type: String, required: true } }],
});

module.exports = mongoose.model("Projects", projectSchema);
