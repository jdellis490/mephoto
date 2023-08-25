const db = require("./connection");
const { User, ImageCard } = require("../models");

db.once("open", async () => {
  await User.deleteMany();
  await ImageCard.deleteMany();

  await ImageCard.insertMany([
    {
      imageUrl: "/images/stormtroopers.jpeg",
      title: "Stormtroopers",
      description: "Soldiers clad in all white means trouble.",
      imageAuthor: "JediMaster1",
    },
    {
      imageUrl: "/images/gaming-pc.jpeg",
      title: "PC Setup",
      description: "New gaming pc complete with RGB!",
      imageAuthor: "Gamerguy9",
    },
    {
      imageUrl: "/images/ps4controller.jpeg",
      title: "Gaming Aesthetic",
      description: "Cool pic of my controller with ambient lighting.",
      imageAuthor: "Gamerguy9",
    },
  ]);

  console.log("ImageCards seeded!");

  await User.create({
    username: "JediMaster1",
    email: "jedi@email.com",
    password: "password1",
    imageCards: [],
  });

  await User.create({
    username: "Gamerguy9",
    email: "pay2win@testemail.com",
    password: "password2",
    imageCards: [],
  });

  await User.create({
    username: "Tester",
    email: "test@email.com",
    password: "password1",
    imageCards: [],
  });

  console.log("Users seeded!");

  process.exit();
});
