const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  favoritedisc: {
    type: String,
  },
  favoritebrand: {
    type: String,
  },
  nickname: {
    type: String,
  },
  homecourse: {
    type: String
  },
  status: {
    type: String,
    default: true
  }
});

module.exports = mongoose.model("profile", ProfileSchema);
