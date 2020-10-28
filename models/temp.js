const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  items: [
    {
      item1: {
        type: String,
        required: true,
      },
      item2: {
        type: String,
      },
    } ]
  })