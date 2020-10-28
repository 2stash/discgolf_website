const mongoose = require("mongoose");

const BagSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  disccollection: [
    {
      discname: {
        type: String,
        required: true,
      },
      discmanufacturer: {
        type: String,
      },
      disctype: {
        type: String,
      },
      discspeed: {
        type: String,
      },
      discglide: {
        type: String,
      },
      discturn: {
        type: String,
      },
      discfade: {
        type: String,
      },
    },
  ],
  imageURL: {
    type: String,
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
    type: String,
  },
  status: {
    type: String,
    default: true,
  }
});

module.exports = mongoose.model("bag", BagSchema);
