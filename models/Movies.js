const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieDirector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Director",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
