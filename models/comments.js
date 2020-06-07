const mongoose = require("mongoose");

const Comments = new mongoose.Schema({
  text: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts"
  }
});

module.exports = mongoose.model("comments", Comments);
