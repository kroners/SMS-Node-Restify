const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: false,
    trim: true
  },
  messageDeliveredId: {
    type: String,
    required: false,
    trim: true
  },
  status: {
    type: String,
    required: true,
    trim: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

mongoose.model("NotificationSchema", NotificationSchema);
