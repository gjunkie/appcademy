var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var gameSchema = mongoose.Schema({
  creation_date: { type: Date, required: true, default: Date.now },
  creator: { type: ObjectId, ref: 'User' },
  name: String,
  users: [{
    type: ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('User', userSchema);
