const db = require('./connection');
const { User, ImageCard } = require('../models');

db.once('open', async () => {
    await User.deleteMany();
    await ImageCard.deleteMany();

    // for (let i = 0; i < imageCards.length; i++) {
    //     const { _id, imageAuthor } = await ImageCard.create(imageCards[i]);
    //     const user = await User.findOneAndUpdate(
    //         { username: imageAuthor },
    //         { $addToSet: {
    //             imageCards: _id,
    //         },
    //     }
    //     )
    // }

    await ImageCard.insertMany([
    {
        image: '/images/stormtroopers.jpeg',
        title: 'Stormtroopers',
        description: 'Soldiers clad in all white means trouble.',
        imageAuthor: 'JediMaster1'
    },
    {
        image: '/images/gaming-pc.jpeg',
        title: 'PC Setup',
        description: 'New gaming pc complete with RGB!',
        imageAuthor: 'Gamerguy9'
    },
    {
        image: '/images/ps4controller.jpeg',
        title: 'Gaming Aesthetic',
        description: 'Cool pic of my controller with ambient lighting.',
        imageAuthor: 'Gamerguy9'
    }
]);

console.log("ImageCards seeded!");

await User.create({
    username: 'JediMaster1',
    email: 'jedi@email.com',
    password: 'password1',
    imageCards: [ 
        // { 
        //     image: 'stormtroopers.jpeg',
        //     title: 'Stormtroopers',
        //     description: 'Soldiers clad in all white means trouble.',
        //     imageAuthor: 'JediMaster1'
        // }
    ]
});

await User.create({
    username: 'Gamerguy9',
    email: 'pay2win@testemail.com',
    password: 'password2',
    imageCards: [
        // { 
        //     image: 'gaming-pc.jpeg',
        //     title: 'PC Setup',
        //     description: 'New gaming pc complete with RGB!',
        //     imageAuthor: 'Gamerguy9'
        // },
        // {
        //     image: 'ps4controller.jpeg',
        //     title: 'Gaming Aesthetic',
        //     description: 'Cool pic of my controller with ambient lighting.',
        //     imageAuthor: 'Gamerguy9'
        // }
    ]
});

await User.create({
    username: 'Tester',
    email: 'test@email.com',
    password: 'password1',
    imageCards: [ 
        // { 
        //     image: 'stormtroopers.jpeg',
        //     title: 'Stormtroopers',
        //     description: 'Soldiers clad in all white means trouble.',
        //     imageAuthor: 'JediMaster1'
        // }
    ]
});

console.log('Users seeded!');

// for (let i = 0; i < ImageCard.length; i++) {
//     const { _id, imageAuthor } = await ImageCard.create(ImageCard[i]);
//     const user = await User.findOneAndUpdate(
//         { username: imageAuthor },
//         {
//             $addToSet: {
//                 imageCards: _id,
//             },
//         }
//     )
// };

process.exit();
});