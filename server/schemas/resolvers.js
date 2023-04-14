const { AuthenticationError } = require('apollo-server-express');
const { User, ImageCard } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('imageCards');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('imageCards');
        },
        imageCards: async (parent, { username }) => {
            const params = username ? { username } : {};
            return await ImageCard.find(params).sort({ createdAt: -1 });
        },
        imageCard: async (parent, { imageId }) => {
            return await ImageCard.findOne({ _id: imageId });
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('User not found with this email address!');
            }
            const correctPassword = await user.isCorrectPassword(password);

            if(!correctPassword) {
                throw new AuthenticationError('Incorret Email or Password');
            }
            const token = signToken(user);
            return { token, user };
        },
        addImageCard: async (parent, { image, title, description, imageAuthor }) => {
            const imageCard = await ImageCard.create({ image, title, description, imageAuthor });

            await User.findOneAndUpdate(
                { username: imageAuthor },
                { $addToSet: { imageCards: imageCard._id } }
            );
            return imageCard;
        },
        addComment: async (parent, { imageId, commentText, commentAuthor }) => {
            return ImageCard.findByIdAndUpdate(
                { _id: imageId },
                { $addToSet: { comments: { commentText, commentAuthor } },
                },
                { new: true,
                runValidators: true,
                }
            );
        },
        deleteImageCard: async (parent, { imageId }) => {
            return ImageCard.findOneAndDelete({ _id: imageId });
        },
        deleteComment: async (parent, { imageId, commentId }) => {
            return ImageCard.findOneAndUpdate(
                { _id: imageId },
                { $pull: { comments: { _id: commentId } } },
                { new: true }
            );
        },
    },
};

module.exports = resolvers;