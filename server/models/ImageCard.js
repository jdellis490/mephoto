const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const imageCardSchema = new Schema({
    image: {
        type: Image,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 280,
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

const ImageCard = model('ImageCard', imageCardSchema);

module.exports = ImageCard;
