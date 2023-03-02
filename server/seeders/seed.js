const db = require('../config/connection');
const { User, ImageCard } = require('../models');
const userSeeds = require('./userSeeds.json');
const imageSeeds = require('./imageSeeds.json');

db.once('open', async () => {
    try {
        await ImageCard.deleteMany({});
        await User.deleteMany({});

        await User.create(userSeeds);

        for (let i = 0; i < imageSeeds.length; i++) {
            const { _id, imageAuthor } = await ImageCard.create(imageSeeds[i]);
            const user = await User.findByIdAndUpdate(
                { username: imageAuthor },
                { $addToSet: {
                    imageCards: _id,
                },
            }
            );
        } 
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    
    console.log('All seeded!');
    process.exit(0);
});