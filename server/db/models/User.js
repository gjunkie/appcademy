const mongoose = require('mongoose');                         

const ObjectId = mongoose.Schema.Types.ObjectId;              

const userSchema = mongoose.Schema({
  id: String,                                               
  creationDate: { type: Date, required: true, default: Date.now },
  email: String,
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
