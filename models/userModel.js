const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  UserName: {
    type: String,
    required: [true, "Please provide a UserName"],
    lowercase: true,
    min: 3,
  },
  ProfilePhoto: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  Email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    lowercase: true,
  },
  Password: {
    type: String,
    required: [true, "Please provide a Password"],
    min: 7,

  }
});

const UserModel = mongoose.models.users || mongoose.model("users", userSchema);

export default UserModel;