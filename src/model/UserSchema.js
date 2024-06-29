const mongoose = require("mongoose");

const instagramUserSchema = new mongoose.Schema({
  instagram_user_id: {
    type: String,
    required: true,
    unique: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: false,
  },
  full_name: {
    type: String,
    required: false,
  },
  profile_picture: {
    type: String,
    required: false,
  },
});

// Middleware to update the 'updated_at' field on save
instagramUserSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const InstagramUser = mongoose.model("InstagramUser", instagramUserSchema);

module.exports = InstagramUser;
