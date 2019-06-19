const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  messages: [{ type: Schema.Types.ObjectId, ref: "Notification" }]
});

mongoose.model("User", UserSchema);
