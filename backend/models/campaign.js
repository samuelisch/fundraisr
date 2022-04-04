const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userCreated: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  amountTarget: {
    type: Number,
    required: true,
  },
  amountDonated: {
    type: Number,
    default: 0,
  },
  dateStart: {
    type: String,
    required: true,
  },
  dateEnd: {
    type: String,
    // required: true,
  },
  donors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  images: [
    {
      data: Buffer,
      contentType: String
    }
  ],
  tags: [
    {
      type: String
    }
  ]
})

campaignSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Campaign', campaignSchema);