const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const userSchema = new Schema ({
//   name: {
//     type: String,
//     required: true,
//     minlength: 3,
//     maxlength: 50
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 8,
//     select: false
//   },
//   role: {
//     type: String,
//     enum: ['admin', 'user'],
//     default: 'user'
//   },
//   created_at: {
//     type: Date,
//     default: Date.now
//   }
// })

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("User", userSchema);