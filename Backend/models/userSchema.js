const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
  },
  lists: [{
    listName: String,
    books: [String]
  }],
  preference:[{
        genre : String ,
        points : Number
  }]

});

const userModel = mongoose.model('userData', userSchema);

module.exports = userModel;
