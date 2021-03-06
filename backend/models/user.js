const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    minLength: [5, 'Minimum password length of 5 required']
  },
  createdOn: {
    type: String,
    required: true
  },
  campaignsCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign'
    }
  ],
  donations: [
    {
      campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign'
      },
      amount: {
        type: Number,
        min: 1,
      }
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
})

module.exports = mongoose.model('User', userSchema);