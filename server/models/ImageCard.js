const mongoose = require('mongoose');
const { Schema } = mongoose;
const dateFormat = require('../utils/dateFormat');

const imageCardSchema = new Schema({
    imageUrl: {
        type: String,
    },
    title: {
        type: String,
        trim: true,
        maxlength: 25,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 300,
    },
    imageAuthor: {
        type: String,
        trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    comments: [
        {
          commentText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
          },
          commentAuthor: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
          },
        },
      ],
});

const ImageCard = mongoose.model('ImageCard', imageCardSchema);

module.exports = ImageCard;
