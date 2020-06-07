const mongoose = require("mongoose");

const Posts = new mongoose.Schema({
  title: {
    type: String
  },
  text: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("posts", Posts);
